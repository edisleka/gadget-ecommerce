import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/authProvider'
import { generateOrderSlug } from '@/utils/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetProductsAndCategories = () => {
  return useQuery({
    queryKey: ['products', 'categories'],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        supabase.from('product').select('*'),
        supabase.from('category').select('*'),
      ])

      if (products.error || categories.error) {
        throw new Error('An error occurred while fetching data')
      }

      return { products: products.data, categories: categories.data }
    },
  })
}

export const useGetProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        throw new Error(
          `An error occurred while fetching data: ${error?.message}`
        )
      }

      return data
    },
  })
}

export const useGetCategoryAndProducts = (categorySlug: string) => {
  return useQuery({
    queryKey: ['categoryAndProducts', categorySlug],
    queryFn: async () => {
      const { data: category, error: categoryError } = await supabase
        .from('category')
        .select('*')
        .eq('slug', categorySlug)
        .single()

      if (categoryError || !category) {
        throw new Error(
          `An error occurred while fetching data: ${categoryError?.message}`
        )
      }

      const { data: products, error: productsError } = await supabase
        .from('product')
        .select('*')
        .eq('category', category.id)

      if (productsError) {
        throw new Error(
          `An error occurred while fetching data: ${productsError?.message}`
        )
      }

      return { category, products }
    },
  })
}

export const useGetMyOrders = () => {
  const {
    user: { id },
  } = useAuth()

  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user', id)

      if (error) {
        throw new Error(
          `An error occurred while fetching data: ${error?.message}`
        )
      }

      return data
    },
  })
}

export const useCreateOrder = () => {
  const {
    user: { id },
  } = useAuth()

  const slug = generateOrderSlug()

  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({ totalPrice }: { totalPrice: number }) {
      const { data, error } = await supabase
        .from('order')
        .insert({
          totalPrice,
          slug,
          user: id,
          status: 'Pending',
        })
        .select('*')
        .single()

      if (error)
        throw new Error(
          'An error occurred while creating order: ' + error.message
        )

      return data
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['order'] })
    },
  })
}

export const useGetMyOrder = (slug: string) => {
  const {
    user: { id },
  } = useAuth()

  return useQuery({
    queryKey: ['orders', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order')
        .select('*, order_items:order_item(*, products:product(*))')
        .eq('slug', slug)
        .eq('user', id)
        .single()

      if (error) {
        throw new Error(
          `An error occurred while fetching data: ${error?.message}`
        )
      }

      return data
    },
  })
}
