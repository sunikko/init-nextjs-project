'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/customer/product-card'
import { fetch_all_products, fetch_all_categories } from '@/lib/api/products'
import type { Product } from '@/lib/api/products'
import { X } from 'lucide-react'

export default function ProductsPage() {
  // 상품 및 카테고리 상태
  const [products, set_products] = useState<Product[]>([])
  const [categories, set_categories] = useState<string[]>([])
  const [selected_category, set_selected_category] = useState<string | null>(null)
  const [is_loading, set_is_loading] = useState(true)

  // 초기 데이터 로드
  useEffect(() => {
    const load_data = async () => {
      set_is_loading(true)
      const [products_data, categories_data] = await Promise.all([
        fetch_all_products(),
        fetch_all_categories(),
      ])
      set_products(products_data)
      set_categories(categories_data)
      set_is_loading(false)
    }
    load_data()
  }, [])

  // 필터링된 상품
  const filtered_products = selected_category
    ? products.filter((p) => p.category === selected_category)
    : products

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          All Products
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Find classes that match your interests
        </p>
      </div>

      {/* 카테고리 필터 */}
      {categories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {/* "All" 버튼 */}
            <button
              onClick={() => set_selected_category(null)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selected_category === null
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black'
                  : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700'
              }`}
            >
              All Categories
            </button>

            {/* 카테고리별 필터 버튼 */}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => set_selected_category(category)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selected_category === category
                    ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700'
                }`}
              >
                {category}
                {selected_category === category && (
                  <X className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>

          {/* 선택된 카테고리 표시 */}
          {selected_category && (
            <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Showing {filtered_products.length} {filtered_products.length === 1 ? 'product' : 'products'} in <span className="font-semibold text-zinc-900 dark:text-zinc-50">{selected_category}</span>
            </div>
          )}
        </div>
      )}

      {/* 상품 그리드 */}
      {is_loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-50"></div>
        </div>
      ) : filtered_products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered_products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug || ''}
              title={product.title}
              description={product.description}
              price={product.price}
              duration={product.duration}
              image_url={product.image_url}
              rating={product.rating || 4.5}
              review_count={product.review_count || 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            No products available in this category.
          </p>
        </div>
      )}
    </div>
  )
}
