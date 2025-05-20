import ProductList, { ProductListSkeleton } from '@/app/modules/products/ui/coomponents/product-list'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'

interface Props {
  params: Promise<{
    category: string
    subcategory: string
  }>
}
export default async function Page({ params }: Props) {
  const { category, subcategory } = await params
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory,
    })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={category} />
      </Suspense>
    </HydrationBoundary>
  )
}
