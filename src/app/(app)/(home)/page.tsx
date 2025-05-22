import { loadProductFilters } from '@/app/modules/products/search-params'
import ProductListView from '@/app/modules/products/ui/view/product-list-view'
import { DEFAULT_LIMIT } from '@/constants'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { SearchParams } from 'nuqs/server'
interface Props {
  searchParams: Promise<SearchParams>
}
export default async function Page({ searchParams }: Props) {
  const filters = await loadProductFilters(searchParams)
  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  )
}
