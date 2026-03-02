import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      product_id,
      user_id,
      reservation_date,
      participant_count,
      total_price,
      special_request = '',
      time_slot = '',
    } = body || {}

    if (
      !product_id ||
      !user_id ||
      !reservation_date ||
      typeof participant_count !== 'number' ||
      typeof total_price !== 'number'
    ) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload.' },
        { status: 400 }
      )
    }

    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const service_key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabase_url || !service_key) {
      return NextResponse.json(
        { success: false, message: 'Server is not configured for reservations.' },
        { status: 500 }
      )
    }

    const admin = createClient(supabase_url, service_key)

    // Load availability
    const { data: avail_row, error: avail_err } = await admin
      .from('availability')
      .select('id, time_slots')
      .eq('product_id', product_id)
      .eq('date', reservation_date)
      .single()

    if (avail_err) {
      return NextResponse.json(
        { success: false, message: 'Availability not found' },
        { status: 400 }
      )
    }

    const slots: Array<{ time: string; available: number }> =
      (avail_row?.time_slots as Array<{ time: string; available: number }>) || []
    const idx = slots.findIndex((s) => s.time === time_slot)
    if (idx === -1) {
      return NextResponse.json(
        { success: false, message: 'Invalid time slot' },
        { status: 400 }
      )
    }
    if (slots[idx].available < participant_count) {
      return NextResponse.json(
        { success: false, message: 'Time slot fully booked' },
        { status: 409 }
      )
    }

    // Decrement availability
    const updated_slots = [...slots]
    updated_slots[idx] = {
      ...updated_slots[idx],
      available: updated_slots[idx].available - participant_count,
    }

    const { error: update_err } = await admin
      .from('availability')
      .update({ time_slots: updated_slots })
      .eq('product_id', product_id)
      .eq('date', reservation_date)

    if (update_err) {
      return NextResponse.json(
        { success: false, message: update_err.message },
        { status: 400 }
      )
    }

    // Insert reservation
    const { data, error } = await admin
      .from('reservations')
      .insert([
        {
          product_id,
          user_id,
          reservation_date,
          participant_count,
          total_price,
          special_request,
          time_slot,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unexpected server error.' },
      { status: 500 }
    )
  }
}
