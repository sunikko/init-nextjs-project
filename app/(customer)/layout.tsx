'use client'

import { Header } from '@/components/common/header'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* 헤더 네비게이션 */}
      <Header />

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
