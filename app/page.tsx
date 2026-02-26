import Link from 'next/link'
import { ProductCarousel } from '@/components/customer/product-carousel'
import { ApiTestComponent } from '@/components/dev/api-test'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-950">
      {/* 개발용 API 테스트 패널 */}
      <ApiTestComponent />
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
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* 메인 히어로 섹션 */}
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            Discover Your Passion
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
            Learn new skills and experience through various classes and workshops
          </p>

          {/* CTA 버튼 */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-8 py-3 text-lg font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 transition-colors"
            >
              Get Started Now
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-8 py-3 text-lg font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* 상품 Carousel 섹션 */}
        <div className="mt-20 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Popular Classes
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Check out the most popular classes right now
            </p>
          </div>
          <ProductCarousel />
        </div>

        {/* 특징 섹션 */}
        <div id="features" className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'Variety of Classes',
              description: 'Choose from a wide range of classes including yoga, cooking, dance, and more',
            },
            {
              title: 'Easy Booking',
              description: 'Simply select your desired date and time on the calendar to book',
            },
            {
              title: 'Secure Payment',
              description: 'Use our secure payment system with confidence',
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
