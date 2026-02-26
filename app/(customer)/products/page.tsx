import { ProductCard } from '@/components/customer/product-card'
import { fetch_all_products } from '@/lib/api/products'

export default async function ProductsPage() {
  // Supabase에서 상품 데이터 가져오기
  const products = await fetch_all_products()

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          모든 상품
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          당신의 관심사에 맞는 클래스를 찾아보세요
        </p>
      </div>

      {/* 상품 그리드 */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
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
            현재 등록된 상품이 없습니다.
          </p>
        </div>
      )}
    </div>
  )
}
