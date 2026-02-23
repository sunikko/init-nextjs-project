interface ProductDetailPageProps {
  params: Promise<{
    productId: string
  }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params

  return (
    <div className="min-h-screen py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          상품 상세 페이지
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          상품 ID: {productId}
        </p>
        <p className="mt-2 text-base text-zinc-500 dark:text-zinc-500">
          이 페이지는 추후에 구현됩니다.
        </p>
      </div>
    </div>
  )
}
