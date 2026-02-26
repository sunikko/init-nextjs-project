import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트 생성
// 환경변수에서 URL과 익명 키를 읽어옴
const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabase_url || !supabase_key) {
  throw new Error(
    'Supabase URL과 ANON KEY를 환경변수에 설정해주세요. (.env.local 파일 확인)'
  )
}

// 브라우저용 Supabase 클라이언트
export const supabase = createClient(supabase_url, supabase_key)
