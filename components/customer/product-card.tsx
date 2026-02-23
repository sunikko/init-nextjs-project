'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface ProductCardProps {
  id: string
  title: string
  description: string
  price: number
  duration: number
  image_url: string
  rating: number
  review_count: number
}

export function ProductCard({
  id,
  title,
  description,
  price,
  duration,
  image_url,
  rating,
  review_count,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 hover:shadow-lg transition-shadow cursor-pointer h-full">
        {/* 이미지 섹션 */}
        <div className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="eager"
          />
        </div>

        {/* 컨텐츠 섹션 */}
        <div className="p-4 flex flex-col h-full">
          {/* 제목 */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2">
            {title}
          </h3>

          {/* 설명 */}
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {description}
          </p>

          {/* 별점과 리뷰 수 */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {rating}
              </span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              ({review_count}개 리뷰)
            </span>
          </div>

          {/* 소요 시간과 가격 */}
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span>⏱️</span>
              <span>{duration}분</span>
            </div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              ₩{price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
