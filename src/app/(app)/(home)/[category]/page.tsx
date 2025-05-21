import ProductFilters from '@/app/modules/products/ui/coomponents/product-filters'
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
      <div className={'px-4 lg:px-12 py-8 flex flex-col gap-4'}>
        <div className={'grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12'}>
          <div className={'lg:col-span-2 xl:col-span-2'}>
            <ProductFilters />
          </div>
          <div className={'lg:col-span-4 xl:col-span-6'}>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}
