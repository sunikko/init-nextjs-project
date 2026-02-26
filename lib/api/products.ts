import { supabase } from '@/lib/supabase'

// 상품 타입 정의
export interface Product {
  id: string
  title: string
  description: string
  price: number
  duration: number
  max_participants: number
  category: string
  image_url: string
  slug?: string
  is_active: boolean
  admin_id: string
  created_at: string
  updated_at: string
  rating?: number
  review_count?: number
}

// 모든 상품 조회
export async function fetch_all_products(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('상품 조회 에러:', error.message)
      throw error
    }

    // 기본값 설정 (rating, review_count가 없을 경우)
    return (data || []).map((product) => ({
      ...product,
      rating: product.rating || 4.5,
      review_count: product.review_count || 0,
    }))
  } catch (error) {
    console.error('fetch_all_products 에러:', error)
    return []
  }
}

// 단일 상품 조회 (ID 기반)
export async function fetch_product_by_id(product_id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', product_id)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('상품 조회 에러:', error.message)
      return null
    }

    // 기본값 설정
    if (data) {
      return {
        ...data,
        rating: data.rating || 4.5,
        review_count: data.review_count || 0,
      }
    }

    return null
  } catch (error) {
    console.error('fetch_product_by_id 에러:', error)
    return null
  }
}

// 단일 상품 조회 (slug 기반)
export async function fetch_product_by_slug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('상품 조회 에러 (slug):', error.message)
      return null
    }

    // 기본값 설정
    if (data) {
      return {
        ...data,
        rating: data.rating || 4.5,
        review_count: data.review_count || 0,
      }
    }

    return null
  } catch (error) {
    console.error('fetch_product_by_slug 에러:', error)
    return null
  }
}

// 카테고리별 상품 조회
export async function fetch_products_by_category(category: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('카테고리별 상품 조회 에러:', error.message)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('fetch_products_by_category 에러:', error)
    return []
  }
}

// 상품 생성 (어드민용)
export async function create_product(product_data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product_data])
      .select()

    if (error) {
      console.error('상품 생성 에러:', error.message)
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error('create_product 에러:', error)
    return null
  }
}

// 상품 수정 (어드민용)
export async function update_product(
  product_id: string,
  updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', product_id)
      .select()

    if (error) {
      console.error('상품 수정 에러:', error.message)
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error('update_product 에러:', error)
    return null
  }
}

// 상품 삭제 (소프트 삭제: is_active = false)
export async function delete_product(product_id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', product_id)
      .select()

    if (error) {
      console.error('상품 삭제 에러:', error.message)
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error('delete_product 에러:', error)
    return null
  }
}
