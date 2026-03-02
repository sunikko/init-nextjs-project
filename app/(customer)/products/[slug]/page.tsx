'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ArrowLeft, MapPin, Users, Clock } from 'lucide-react'
import { BookingCalendar } from '@/components/customer/booking-calendar'
import { ReservationModal, type ReservationData } from '@/components/customer/reservation-modal'
import { fetch_product_by_slug } from '@/lib/api/products'
import { useParams } from 'next/navigation'
import type { Product } from '@/lib/api/products'
import { format_currency } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // 상품 및 로딩 상태
  const [product, set_product] = useState<Product | null>(null)
  const [is_loading, set_is_loading] = useState(true)
  const [error_message, set_error_message] = useState<string | null>(null)

  // Supabase에서 상품 데이터 가져오기
  useEffect(() => {
    const load_product = async () => {
      set_is_loading(true)
      set_error_message(null)

      if (!slug) {
        set_error_message('Invalid product path.')
        set_is_loading(false)
        return
      }

      const data = await fetch_product_by_slug(slug)
      if (!data) {
        set_error_message('Product not found.')
      }
      set_product(data)
      set_is_loading(false)
    }

    load_product()
  }, [slug])

  // 상태 관리
  const [selected_date, set_selected_date] = useState<Date | null>(null)
  const [is_modal_open, set_is_modal_open] = useState(false)
  const default_time_slots = ['09:00', '11:00', '13:00', '15:00', '17:00']

  // 예약 모달 열기
  const handle_open_modal = () => {
    if (!selected_date) {
      alert('Please select a date.')
      return
    }
    set_is_modal_open(true)
  }

  // 예약 제출
  const handle_reservation_submit = async (data: ReservationData) => {
    try {
      // 유저 확인
      const { data: auth_data } = await supabase.auth.getUser()
      const user_id = auth_data.user?.id
      if (!user_id || !product || !selected_date) {
        alert('You must be logged in and select a date to book.')
        return
      }

      // YYYY-MM-DD로 변환
      const reservation_date = selected_date.toISOString().slice(0, 10)

      // 서버 라우트로 예약 저장 (RLS 영향 없음)
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          user_id,
          reservation_date,
          participant_count: data.participant_count,
          total_price: data.total_price,
          special_request: data.special_request || '',
          time_slot: data.time_slot,
        }),
      })

      const json = await res.json()
      if (!res.ok || !json?.success) {
        alert(`Failed to save booking: ${json?.message || 'Unknown error'}`)
        return
      }

      alert(`Booking completed!\nTotal Price: ${format_currency(data.total_price)}`)
      set_is_modal_open(false)
      set_selected_date(null)
    } catch (error) {
      console.error('handle_reservation_submit error:', error)
      alert('An unexpected error occurred.')
    }
  }

  // 로딩 중
  if (is_loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-50"></div>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  // 상품을 찾지 못한 경우 또는 에러 발생
  if (!product || error_message) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Product Not Found
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              {error_message || 'The product you requested does not exist.'}
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 왼쪽: 이미지 섹션 */}
          <div>
            <div className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden">
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* 카테고리와 별점 */}
            <div className="mt-6 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {product.rating}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  ({product.review_count} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* 오른쪽: 정보 섹션 */}
          <div>
            {/* 제목 */}
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {product.title}
            </h1>

            {/* 설명 */}
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              {product.description}
            </p>

            {/* 정보 카드들 */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Duration
                  </span>
                </div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {product.duration} min
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Max Participants
                  </span>
                </div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {product.max_participants}{' '}
                  {product.max_participants === 1 ? 'person' : 'people'}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
                <span className="text-xs font-medium text-blue-800 dark:text-blue-200 block mb-2">
                  Price Per Person
                </span>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">
                  {format_currency(product.price)}
                </p>
              </div>
            </div>

            {/* 가격 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Estimated Total Price
              </p>
              <p className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">
                {selected_date ? (
                  <>{format_currency(product.price)}</>
                ) : (
                  <>Select a date</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 캘린더 및 예약 섹션 */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 캘린더 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Select Booking Date
            </h2>
            <BookingCalendar
              on_date_select={set_selected_date}
              selected_date={selected_date}
              locale="en-GB"
            />
          </div>

          {/* 예약 정보 */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Booking Summary
            </h2>

            <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 sticky top-6 space-y-4">
              {/* 클래스명 */}
              <div>
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Class Name
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {product.title}
                </p>
              </div>

              {/* 선택된 날짜 */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Booking Date
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {selected_date
                    ? selected_date.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'short',
                      })
                    : 'Not Selected'}
                </p>
              </div>

              {/* 시간 슬롯 */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Time Slot
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {selected_date ? 'Select in the next step' : 'Not Selected'}
                </p>
              </div>

              {/* 예약 버튼 */}
              <button
                onClick={handle_open_modal}
                disabled={!selected_date}
                className={`w-full rounded-lg px-6 py-3 text-base font-semibold transition-colors border-t border-zinc-200 dark:border-zinc-800 pt-4 ${
                  selected_date
                    ? 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 cursor-pointer'
                    : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
                }`}
              >
                Book Now
              </button>

              {/* 안내 메시지 */}
              {!selected_date && (
                <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
                  You can book after selecting a date
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 예약 모달 */}
        <ReservationModal
          is_open={is_modal_open}
          on_close={() => set_is_modal_open(false)}
          product_title={product.title}
          selected_date={selected_date}
          max_participants={product.max_participants}
          price={product.price}
          time_slots={default_time_slots}
          on_submit={handle_reservation_submit}
        />
      </div>
    </div>
  )
}
