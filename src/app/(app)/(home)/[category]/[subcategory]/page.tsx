import { loadProductFilters } from '@/app/modules/products/search-params'
import ProductListView from '@/app/modules/products/ui/view/product-list-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { SearchParams } from 'nuqs/server'

interface Props {
  params: Promise<{
    category: string
    subcategory: string
  }>
  searchParams: Promise<SearchParams>
}
export default async function Page({ params, searchParams }: Props) {
  const { subcategory } = await params
  const filters = await loadProductFilters(searchParams)
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory,
      ...filters,
    })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subcategory} />
    </HydrationBoundary>
  )
}
