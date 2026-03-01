'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { sign_out } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import { LogOut, Menu, X } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const [user_name, set_user_name] = useState<string | null>(null)
  const [is_loading, set_is_loading] = useState(true)
  const [is_signing_out, set_is_signing_out] = useState(false)
  const [is_menu_open, set_is_menu_open] = useState(false)

  // 현재 사용자 확인
  useEffect(() => {
    const check_user = async () => {
      set_is_loading(true)
      const { data } = await supabase.auth.getUser()
      
      if (data.user) {
        // 사용자 정보 조회
        const { data: user_data } = await supabase
          .from('users')
          .select('name')
          .eq('id', data.user.id)
          .single()
        
        set_user_name(user_data?.name || data.user.email)
      } else {
        set_user_name(null)
      }
      set_is_loading(false)
    }

    check_user()

    // 인증 상태 변경 감시
    const { data: auth_listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          supabase
            .from('users')
            .select('name')
            .eq('id', session.user.id)
            .single()
            .then(({ data }) => {
              set_user_name(data?.name || session.user.email)
            })
        } else {
          set_user_name(null)
        }
      }
    )

    return () => {
      auth_listener?.subscription.unsubscribe()
    }
  }, [])

  // 로그아웃 처리
  const handle_logout = async () => {
    set_is_signing_out(true)
    await sign_out()
    set_user_name(null)
    router.push('/')
    set_is_signing_out(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            BookingHub
          </Link>

          {/* 네비게이션 메뉴 (데스크톱) */}
          <div className="hidden sm:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Products
            </Link>

            {is_loading ? (
              <div className="w-20 h-8 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
            ) : user_name ? (
              // 로그인 상태
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {user_name}
                </span>
                <button
                  onClick={handle_logout}
                  disabled={is_signing_out}
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              // 미로그인 상태
              <>
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
              </>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="sm:hidden relative">
            <button
              onClick={() => set_is_menu_open((v) => !v)}
              aria-expanded={is_menu_open}
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              {is_menu_open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {is_menu_open && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg p-2">
                <Link
                  href="/products"
                  onClick={() => set_is_menu_open(false)}
                  className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  Products
                </Link>

                {is_loading ? (
                  <div className="h-8 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mt-1"></div>
                ) : user_name ? (
                  <>
                    <div className="px-3 pt-2 pb-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {user_name}
                    </div>
                    <button
                      onClick={() => {
                        set_is_menu_open(false)
                        handle_logout()
                      }}
                      disabled={is_signing_out}
                      className="mt-1 inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => set_is_menu_open(false)}
                      className="mt-1 block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => set_is_menu_open(false)}
                      className="mt-1 block rounded-md px-3 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
