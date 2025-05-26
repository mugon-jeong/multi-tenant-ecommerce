import ProductView from '@/app/modules/products/ui/view/product-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

interface Props {
  params: Promise<{ productId: string; slug: string }>
}
export default async function Page({ params }: Props) {
  const { slug, productId } = await params
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug: slug,
    })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView productId={productId} tenantSlug={slug} />
    </HydrationBoundary>
  )
}
