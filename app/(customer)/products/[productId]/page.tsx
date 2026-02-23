'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ArrowLeft, MapPin, Users, Clock } from 'lucide-react'
import { BookingCalendar } from '@/components/customer/booking-calendar'
import { ReservationModal, type ReservationData } from '@/components/customer/reservation-modal'
import { mock_products } from '@/lib/mock-data'
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
  const params = useParams()
  const product_id = params.productId as string

  // 상품 찾기
  const product = mock_products.find((p) => p.id === product_id)

  // 상태 관리
  const [selected_date, set_selected_date] = useState<Date | null>(null)
  const [is_modal_open, set_is_modal_open] = useState(false)

  // 예약 모달 열기
  const handle_open_modal = () => {
    if (!selected_date) {
      alert('날짜를 선택해주세요.')
      return
    }
    set_is_modal_open(true)
  }

  // 예약 제출
  const handle_reservation_submit = (data: ReservationData) => {
    console.log('예약 정보:', {
      product_id,
      product_title: product?.title,
      date: selected_date?.toISOString(),
      ...data,
    })
    alert(`예약이 완료되었습니다!\n총 가격: ₩${data.total_price.toLocaleString()}`)
    set_is_modal_open(false)
    set_selected_date(null)
  }

  // 상품을 찾지 못한 경우
  if (!product) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              상품을 찾을 수 없습니다
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              요청하신 상품이 존재하지 않습니다.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              상품 목록으로 돌아가기
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
          상품 목록으로 돌아가기
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
                  ({product.review_count}개 리뷰)
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
                    소요 시간
                  </span>
                </div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {product.duration}분
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    최대 참여자
                  </span>
                </div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {product.max_participants}명
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
                <span className="text-xs font-medium text-blue-800 dark:text-blue-200 block mb-2">
                  1인당 가격
                </span>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">
                  ₩{product.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* 가격 */}
            <div className="mb-8 p-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                최종 예상 가격
              </p>
              <p className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">
                {selected_date ? (
                  <>₩{product.price.toLocaleString()}</>
                ) : (
                  <>날짜를 선택하세요</>
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
              예약 날짜 선택
            </h2>
            <BookingCalendar
              on_date_select={set_selected_date}
              selected_date={selected_date}
            />
          </div>

          {/* 예약 정보 */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              예약 요약
            </h2>

            <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 sticky top-6 space-y-4">
              {/* 클래스명 */}
              <div>
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  클래스명
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {product.title}
                </p>
              </div>

              {/* 선택된 날짜 */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  예약 날짜
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {selected_date
                    ? selected_date.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'short',
                      })
                    : '미선택'}
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
                예약하기
              </button>

              {/* 안내 메시지 */}
              {!selected_date && (
                <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
                  날짜를 선택한 후 예약할 수 있습니다
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
          on_submit={handle_reservation_submit}
        />
      </div>
    </div>
  )
}
