import ProductView, { ProductViewSkeleton } from '@/app/modules/library/ui/views/product-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'

interface Props {
  params: Promise<{
    productId: string
  }>
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: Props) {
  const { productId } = await params
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId: productId,
    })
  )
  void queryClient.prefetchQuery(
    trpc.reviews.getOne.queryOptions({
      productId: productId,
    })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} />
      </Suspense>
    </HydrationBoundary>
  )
}
