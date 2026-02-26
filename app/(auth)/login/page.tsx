'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { sign_in } from '@/lib/api/auth'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()

  // 폼 상태
  const [email, set_email] = useState('')
  const [password, set_password] = useState('')
  const [show_password, set_show_password] = useState(false)

  // 에러 및 로딩 상태
  const [error_message, set_error_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)
  const [is_success, set_is_success] = useState(false)

  // 폼 유효성 검사
  const validate_form = (): boolean => {
    if (!email.trim()) {
      set_error_message('Email is required.')
      return false
    }
    if (!email.includes('@')) {
      set_error_message('Please enter a valid email address.')
      return false
    }
    if (!password.trim()) {
      set_error_message('Password is required.')
      return false
    }
    return true
  }

  // 로그인 제출
  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    set_error_message('')

    if (!validate_form()) {
      return
    }

    set_is_loading(true)

    try {
      const response = await sign_in(email, password)

      if (response.success) {
        set_is_success(true)
        // 2초 후 상품 페이지로 리다이렉트
        setTimeout(() => {
          router.push('/products')
        }, 1500)
      } else {
        set_error_message(response.message || 'Login failed.')
      }
    } catch (error) {
      set_error_message('An unexpected error occurred.')
      console.error('Login error:', error)
    } finally {
      set_is_loading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Welcome Back
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Log in to your account
          </p>
        </div>

        {/* 성공 메시지 */}
        {is_success && (
          <div className="mb-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 p-4">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              ✓ Login successful! Redirecting...
            </p>
          </div>
        )}

        {/* 폼 */}
        <form onSubmit={handle_submit} className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-lg">
          {/* 에러 메시지 */}
          {error_message && !is_success && (
            <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 p-4">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {error_message}
              </p>
            </div>
          )}

          {/* 이메일 입력 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => set_email(e.target.value)}
                disabled={is_loading}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 disabled:opacity-50"
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
              <input
                type={show_password ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => set_password(e.target.value)}
                disabled={is_loading}
                className="w-full pl-12 pr-12 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => set_show_password(!show_password)}
                disabled={is_loading}
                className="absolute right-4 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {show_password ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={is_loading}
            className="w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {is_loading ? 'Logging in...' : 'Log In'}
          </button>

          {/* 회원가입 링크 */}
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-6">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-zinc-900 dark:text-zinc-50 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>

        {/* 홈 링크 */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
