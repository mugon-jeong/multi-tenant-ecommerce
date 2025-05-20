import ProductList, { ProductListSkeleton } from '@/app/modules/products/ui/coomponents/product-list'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'

interface Props {
  params: Promise<{
    category: string
  }>
}
export default async function Page({ params }: Props) {
  const { category } = await params
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: category,
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
