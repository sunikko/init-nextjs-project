import { supabase } from '@/lib/supabase'

// 예약 타입 정의
export interface Reservation {
  id: string
  product_id: string
  user_id: string
  reservation_date: string
  time_slot: string
  participant_count: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  special_request: string
  total_price: number
  created_at: string
  confirmed_at: string | null
  cancelled_at: string | null
  updated_at: string
}

// 새 예약 생성
export async function create_reservation(
  product_id: string,
  user_id: string,
  reservation_date: string,
  participant_count: number,
  total_price: number,
  special_request?: string,
  time_slot?: string
) {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .insert([
        {
          product_id,
          user_id,
          reservation_date,
          participant_count,
          total_price,
          special_request: special_request || '',
          time_slot: time_slot || '',
          status: 'pending',
        },
      ])
      .select()

    if (error) {
      console.error('예약 생성 에러:', error.message)
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error('create_reservation 에러:', error)
    return null
  }
}

// 사용자의 예약 목록 조회
export async function fetch_user_reservations(user_id: string) {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*, products(title, image_url, category)')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('사용자 예약 조회 에러:', error.message)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('fetch_user_reservations 에러:', error)
    return []
  }
}

// 상품별 예약 목록 조회 (어드민용)
export async function fetch_product_reservations(
  product_id: string,
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
) {
  try {
    let query = supabase
      .from('reservations')
      .select('*, users(name, email, phone)')
      .eq('product_id', product_id)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('상품 예약 조회 에러:', error.message)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('fetch_product_reservations 에러:', error)
    return []
  }
}

// 예약 확인 (어드민)
export async function confirm_reservation(reservation_id: string) {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', reservation_id)
      .select()

    if (error) {
      console.error('예약 확인 에러:', error.message)
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error('confirm_reservation 에러:', error)
    return null
  }
}

// 예약 취소
export async function cancel_reservation(reservation_id: string) {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', reservation_id)
      .select()

    if (error) {
      console.error('예약 취소 에러:', error.message)
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error('cancel_reservation 에러:', error)
    return null
  }
}

// 예약 상태 업데이트
export async function update_reservation_status(
  reservation_id: string,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
) {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', reservation_id)
      .select()

    if (error) {
      console.error('예약 상태 업데이트 에러:', error.message)
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error('update_reservation_status 에러:', error)
    return null
  }
}
