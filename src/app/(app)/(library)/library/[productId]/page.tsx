import ProductView from '@/app/modules/library/ui/views/product-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

interface Props {
  params: Promise<{
    productId: string
  }>
}
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
      <ProductView productId={productId} />
    </HydrationBoundary>
  )
}
