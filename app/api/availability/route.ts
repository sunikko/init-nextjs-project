import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get('product_id')
    const date = searchParams.get('date')

    if (!product_id || !date) {
      return NextResponse.json(
        { success: false, message: 'Missing product_id or date' },
        { status: 400 }
      )
    }

    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const service_key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabase_url || !service_key) {
      return NextResponse.json(
        { success: false, message: 'Server not configured' },
        { status: 500 }
      )
    }

    const admin = createClient(supabase_url, service_key)
    const { data, error } = await admin
      .from('availability')
      .select('time_slots')
      .eq('product_id', product_id)
      .eq('date', date)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      )
    }

    const time_slots =
      (data?.time_slots as Array<{ time: string; available: number }>) || []

    return NextResponse.json({ success: true, time_slots })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unexpected server error' },
      { status: 500 }
    )
  }
}
