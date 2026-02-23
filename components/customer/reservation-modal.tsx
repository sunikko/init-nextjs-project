'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface ReservationModalProps {
  is_open: boolean
  on_close: () => void
  product_title: string
  selected_date: Date | null
  max_participants: number
  price: number
  on_submit: (data: ReservationData) => void
}

export interface ReservationData {
  participant_count: number
  special_request: string
  total_price: number
}

export function ReservationModal({
  is_open,
  on_close,
  product_title,
  selected_date,
  max_participants,
  price,
  on_submit,
}: ReservationModalProps) {
  const [participant_count, set_participant_count] = useState(1)
  const [special_request, set_special_request] = useState('')

  // 총 가격 계산
  const total_price = price * participant_count

  // 폼 제출
  const handle_submit = (e: React.FormEvent) => {
    e.preventDefault()
    on_submit({
      participant_count,
      special_request,
      total_price,
    })
  }

  if (!is_open || !selected_date) return null

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={on_close}
        aria-hidden="true"
      />

      {/* 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-xl max-w-md w-full border border-zinc-200 dark:border-zinc-800">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              예약 정보 입력
            </h2>
            <button
              onClick={on_close}
              className="rounded-lg p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>

          {/* 바디 */}
          <form onSubmit={handle_submit} className="p-6 space-y-6">
            {/* 상품명 */}
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                클래스명
              </label>
              <p className="text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3">
                {product_title}
              </p>
            </div>

            {/* 선택된 날짜 */}
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                예약 날짜
              </label>
              <p className="text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3">
                {selected_date.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </p>
            </div>

            {/* 참여자 수 */}
            <div>
              <label htmlFor="participant-count" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                참여자 수 (최대 {max_participants}명)
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => set_participant_count(Math.max(1, participant_count - 1))}
                  className="rounded-lg bg-zinc-200 dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                  aria-label="참여자 수 감소"
                >
                  −
                </button>
                <input
                  id="participant-count"
                  type="number"
                  min="1"
                  max={max_participants}
                  value={participant_count}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1
                    set_participant_count(Math.min(Math.max(value, 1), max_participants))
                  }}
                  className="w-20 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-50"
                />
                <button
                  type="button"
                  onClick={() => set_participant_count(Math.min(max_participants, participant_count + 1))}
                  className="rounded-lg bg-zinc-200 dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                  aria-label="참여자 수 증가"
                >
                  +
                </button>
              </div>
            </div>

            {/* 특별 요청사항 */}
            <div>
              <label htmlFor="special-request" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                특별 요청사항 (선택사항)
              </label>
              <textarea
                id="special-request"
                value={special_request}
                onChange={(e) => set_special_request(e.target.value)}
                placeholder="음식 알레르기, 신체 제약사항 등을 입력해주세요..."
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
                rows={3}
              />
            </div>

            {/* 총 가격 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900 p-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  ₩{price.toLocaleString()} × {participant_count}명
                </span>
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  ₩{total_price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={on_close}
                className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-3 text-sm font-medium text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                예약하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
