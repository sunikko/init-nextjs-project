'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BookingCalendarProps {
  on_date_select: (date: Date) => void
  selected_date: Date | null
}

export function BookingCalendar({ on_date_select, selected_date }: BookingCalendarProps) {
  const [current_month, set_current_month] = useState(new Date())

  // 현재 월의 모든 날짜 배열 생성
  const get_days_in_month = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // 월의 첫 번째 날의 요일 (0 = 일요일, 6 = 토요일)
    const first_day = new Date(year, month, 1).getDay()
    // 월의 마지막 날짜
    const last_date = new Date(year, month + 1, 0).getDate()
    
    // 달력 배열 생성 (6주 x 7일)
    const days = Array(first_day).fill(null)
    for (let i = 1; i <= last_date; i++) {
      days.push(i)
    }
    
    return days
  }

  // 이전 달로 이동
  const handle_prev_month = () => {
    set_current_month(new Date(current_month.getFullYear(), current_month.getMonth() - 1))
  }

  // 다음 달로 이동
  const handle_next_month = () => {
    set_current_month(new Date(current_month.getFullYear(), current_month.getMonth() + 1))
  }

  // 날짜 선택 처리
  const handle_date_click = (day: number) => {
    const selected = new Date(current_month.getFullYear(), current_month.getMonth(), day)
    on_date_select(selected)
  }

  // 과거 날짜 비활성화 확인
  const is_past_date = (day: number) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(current_month.getFullYear(), current_month.getMonth(), day)
    return date < today
  }

  // 선택된 날짜 확인
  const is_selected_date = (day: number) => {
    if (!selected_date) return false
    return (
      selected_date.getFullYear() === current_month.getFullYear() &&
      selected_date.getMonth() === current_month.getMonth() &&
      selected_date.getDate() === day
    )
  }

  const days = get_days_in_month(current_month)
  const month_name = current_month.toLocaleDateString('ko-KR', { month: 'long', year: 'numeric' })
  const day_names = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
      {/* 월 네비게이션 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handle_prev_month}
          className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          aria-label="이전 달"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </button>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {month_name}
        </h3>

        <button
          onClick={handle_next_month}
          className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          aria-label="다음 달"
        >
          <ChevronRight className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </button>
      </div>

      {/* 요일 표시 */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {day_names.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-zinc-600 dark:text-zinc-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && !is_past_date(day) && handle_date_click(day)}
            disabled={!day || is_past_date(day)}
            className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              !day
                ? 'cursor-default'
                : is_past_date(day)
                ? 'cursor-not-allowed text-zinc-300 dark:text-zinc-700 bg-zinc-50 dark:bg-zinc-900/30'
                : is_selected_date(day)
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 선택된 날짜 표시 */}
      {selected_date && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <span className="font-semibold">선택된 날짜:</span>{' '}
            {selected_date.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </p>
        </div>
      )}
    </div>
  )
}
