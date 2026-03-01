'use client'

import { useState } from 'react'
import { fetch_all_products, type Product } from '@/lib/api/products'
import { format_currency } from '@/lib/utils'

/**
 * 개발용 API 테스트 컴포넌트
 * 
 * 사용법:
 * 1. import { ApiTestComponent } from '@/components/dev/api-test'
 * 2. <ApiTestComponent /> 추가
 * 3. 브라우저 콘솔과 UI에서 테스트 결과 확인
 */

export function ApiTestComponent() {
  const [loading, set_loading] = useState(false)
  const [result, set_result] = useState<Product[] | null>(null)
  const [error, set_error] = useState<string | null>(null)

  // API 테스트 실행
  const test_fetch_products = async () => {
    set_loading(true)
    set_error(null)
    set_result(null)

    try {
      console.log('🚀 상품 조회 API 테스트 시작...')
      
      const products = await fetch_all_products()
      
      console.log('✅ API 응답 성공!')
      console.log('📊 상품 개수:', products.length)
      console.log('📦 상품 목록:', products)
      
      set_result(products)
    } catch (err) {
      const error_message = err instanceof Error ? err.message : '알 수 없는 에러'
      console.error('❌ API 에러:', error_message)
      set_error(error_message)
    } finally {
      set_loading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg p-4">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-3">
          🧪 API 테스트 패널
        </h3>

        <button
          onClick={test_fetch_products}
          disabled={loading}
          className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            loading
              ? 'bg-zinc-300 text-zinc-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? '테스트 중...' : '상품 조회 API 테스트'}
        </button>

        {/* 에러 표시 */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900">
            <p className="text-sm text-red-700 dark:text-red-200">
              <span className="font-bold">❌ 에러:</span> {error}
            </p>
          </div>
        )}

        {/* 결과 표시 */}
        {result && (
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
            <p className="text-sm text-green-700 dark:text-green-200 font-bold mb-2">
              ✅ 조회 성공 ({result.length}개)
            </p>
            <div className="text-xs text-green-600 dark:text-green-300 max-h-40 overflow-y-auto">
              {result.map((product: Product, idx: number) => (
                <div key={idx} className="mb-2 p-2 bg-white dark:bg-zinc-900 rounded">
                  <p>
                    <span className="font-semibold">{product.title}</span> - {format_currency(product.price)}
                  </p>
                  <p className="text-xs opacity-70">{product.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 콘솔 확인 안내 */}
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          💡 브라우저 콘솔(F12)에서 상세 로그를 확인하세요
        </p>
      </div>
    </div>
  )
}
