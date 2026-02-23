import Link from 'next/link'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* 헤더 네비게이션 */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* 로고 */}
            <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              BookingHub
            </Link>

            {/* 네비게이션 메뉴 */}
            <div className="flex items-center gap-8">
              <Link
                href="/products"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                상품
              </Link>
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

      {/* 메인 컨텐츠 */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* 푸터 */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            © 2026 BookingHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
