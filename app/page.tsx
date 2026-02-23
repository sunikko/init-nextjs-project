import Link from 'next/link'
import { ProductCarousel } from '@/components/customer/product-carousel'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-950">
      {/* 헤더 네비게이션 */}
      <header className="border-b border-zinc-200 bg-white/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              BookingHub
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
              >
                회원가입
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* 메인 히어로 섹션 */}
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            당신의 열정을 발견하세요
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
            다양한 클래스와 워크숍을 통해 새로운 기술을 배우고 경험해보세요
          </p>

          {/* CTA 버튼 */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-8 py-3 text-lg font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 transition-colors"
            >
              지금 시작하기
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-8 py-3 text-lg font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              자세히 알아보기
            </a>
          </div>
        </div>

        {/* 상품 Carousel 섹션 */}
        <div className="mt-20 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              인기 클래스
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              지금 가장 인기 있는 클래스들을 확인해보세요
            </p>
          </div>
          <ProductCarousel />
        </div>

        {/* 특징 섹션 */}
        <div id="features" className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: '다양한 클래스',
              description: '요가, 요리, 댄스 등 다양한 분야의 클래스를 선택할 수 있습니다',
            },
            {
              title: '쉬운 예약',
              description: '캘린더에서 원하는 날짜와 시간을 선택하여 쉽게 예약하세요',
            },
            {
              title: '안전한 결제',
              description: '안전한 결제 시스템으로 믿고 이용할 수 있습니다',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-zinc-200 bg-white/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/50 py-8 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
            © 2026 BookingHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
