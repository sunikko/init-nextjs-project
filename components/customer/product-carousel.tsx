'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { mock_products } from '@/lib/mock-data'

// 상품 carousel에 보여줄 상품들 선택 (처음 4개)
const carousel_products = mock_products.slice(0, 4)

export function ProductCarousel() {
  const [current_index, set_current_index] = useState(0)

  // 자동 슬라이드 (3초 간격)
  useEffect(() => {
    const interval = setInterval(() => {
      set_current_index((prev) => (prev + 1) % carousel_products.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // 이전 상품으로 이동
  const handle_prev = () => {
    set_current_index(
      (prev) => (prev - 1 + carousel_products.length) % carousel_products.length
    )
  }

  // 다음 상품으로 이동
  const handle_next = () => {
    set_current_index((prev) => (prev + 1) % carousel_products.length)
  }

  const current_product = carousel_products[current_index]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Carousel 컨테이너 */}
      <div className="relative bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {/* 이미지 섹션 */}
          <div className="relative w-full h-64 md:h-80 bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden">
            <Image
              src={current_product.image_url}
              alt={current_product.title}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* 상품 정보 섹션 */}
          <div className="flex flex-col justify-center">
            {/* 카테고리 배지 */}
            <div className="inline-block w-fit mb-3">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {current_product.category}
              </span>
            </div>

            {/* 제목 */}
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 line-clamp-2">
              {current_product.title}
            </h2>

            {/* 설명 */}
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
              {current_product.description}
            </p>

            {/* 별점과 리뷰 */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  ⭐ {current_product.rating}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  ({current_product.review_count}개)
                </span>
              </div>
            </div>

            {/* 정보 (소요시간, 참여자) */}
            <div className="flex items-center gap-6 mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{current_product.duration}분</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👥</span>
                <span>최대 {current_product.max_participants}명</span>
              </div>
            </div>

            {/* 가격과 버튼 */}
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                ₩{current_product.price.toLocaleString()}
              </div>
              <Link
                href={`/products/${current_product.id}`}
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 transition-colors"
              >
                자세히 보기
              </Link>
            </div>
          </div>
        </div>

        {/* 네비게이션 버튼 (좌우) */}
        <button
          onClick={handle_prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 dark:bg-zinc-800/80 p-2 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
          aria-label="이전 상품"
        >
          <ChevronLeft className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
        </button>

        <button
          onClick={handle_next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 dark:bg-zinc-800/80 p-2 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
          aria-label="다음 상품"
        >
          <ChevronRight className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
        </button>
      </div>

      {/* 도트 인디케이터 (현재 위치 표시) */}
      <div className="flex justify-center gap-2 mt-6">
        {carousel_products.map((_, index) => (
          <button
            key={index}
            onClick={() => set_current_index(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current_index
                ? 'bg-zinc-900 dark:bg-zinc-50'
                : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
            aria-label={`${index + 1}번 상품으로 이동`}
          />
        ))}
      </div>
    </div>
  )
}
