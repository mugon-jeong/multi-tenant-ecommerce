'use client'
import { useProductFilters } from '@/app/modules/products/hooks/use-product-filters'
import ProductCard, { ProductCardSkeleton } from '@/app/modules/products/ui/coomponents/product-card'
import { Button } from '@/components/ui/button'
import { DEFAULT_LIMIT } from '@/constants'
import { cn } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { InboxIcon } from 'lucide-react'
interface Props {
  category?: string
  tenantSlug?: string
  narrowView?: boolean
}
export default function ProductList({ category, tenantSlug, narrowView }: Props) {
  const [filters] = useProductFilters()
  const trpc = useTRPC()
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      {
        category: category,
        tenantSlug: tenantSlug,
        ...filters,
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
        },
      }
    )
  )
  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div
        className={
          'border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg'
        }
      >
        <InboxIcon />
        <p className={'text-base font-medium'}>No products found</p>
      </div>
    )
  }
  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4',
          narrowView && 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3'
        )}
      >
        {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant?.slug}
              tenantImageUrl={product.tenant?.image?.url}
              reviewRating={3}
              reviewCount={5}
              price={product.price}
            />
          ))}
      </div>
      <div className={'flex justify-center pt-8'}>
        {hasNextPage && (
          <Button
            variant={'elevated'}
            className={'font-medium disabled:opacity-50 text-base bg-white'}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more...
          </Button>
        )}
      </div>
    </>
  )
}

export const ProductListSkeleton = ({ narrowView }: Props) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4',
        narrowView && 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3'
      )}
    >
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
