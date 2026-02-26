import { supabase } from '@/lib/supabase'

// 회원가입 인터페이스
export interface SignUpData {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user_id?: string
  error?: string
}

// 회원가입
export async function sign_up(data: SignUpData): Promise<AuthResponse> {
  try {
    // Supabase Auth로 사용자 생성
    const { data: auth_data, error: auth_error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    })

    if (auth_error) {
      console.error('회원가입 에러:', auth_error.message)
      return {
        success: false,
        message: auth_error.message || '회원가입에 실패했습니다.',
        error: auth_error.message,
      }
    }

    // users 테이블에 사용자 정보 저장
    if (auth_data.user) {
      const { error: insert_error } = await supabase
        .from('users')
        .insert([
          {
            id: auth_data.user.id,
            email: data.email,
            name: data.name,
            password: data.password, // 실제 환경에서는 해시된 비밀번호만 저장
            role: 'customer',
            is_verified: false,
          },
        ])

      if (insert_error) {
        console.error('사용자 정보 저장 에러:', insert_error.message)
        // Auth는 생성되었지만 DB 저장 실패 - 부분 실패
        return {
          success: true,
          message: '계정이 생성되었습니다. 이메일을 확인해주세요.',
          user_id: auth_data.user.id,
        }
      }
    }

    return {
      success: true,
      message: '회원가입이 완료되었습니다! 이메일을 확인해주세요.',
      user_id: auth_data.user?.id,
    }
  } catch (error) {
    console.error('sign_up 에러:', error)
    return {
      success: false,
      message: '예기치 않은 오류가 발생했습니다.',
      error: String(error),
    }
  }
}

// 이메일 중복 확인
export async function check_email_exists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    // 이메일이 존재하면 true, 없으면 false
    return !error && !!data
  } catch (error) {
    console.error('check_email_exists 에러:', error)
    return false
  }
}
