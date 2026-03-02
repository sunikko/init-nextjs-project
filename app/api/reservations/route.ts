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
