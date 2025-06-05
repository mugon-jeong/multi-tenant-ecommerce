import { loadProductFilters } from '@/app/modules/products/search-params'
import ProductListView from '@/app/modules/products/ui/view/product-list-view'
import { DEFAULT_LIMIT } from '@/constants'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { SearchParams } from 'nuqs/server'

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<SearchParams>
}

export const dynamic = 'force-dynamic'

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const filters = await loadProductFilters(searchParams)
  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  )
}
