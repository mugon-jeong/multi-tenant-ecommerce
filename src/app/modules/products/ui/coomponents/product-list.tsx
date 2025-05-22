'use client'
import { useProductFilters } from '@/app/modules/products/hooks/use-product-filters'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
interface Props {
  category?: string
}
export default function ProductList({ category }: Props) {
  const [filters] = useProductFilters()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category: category,
      ...filters,
    })
  )
  return (
    <div
      className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'}
    >
      {data?.docs.map((product) => (
        <div key={product.id} className={'border rounded-md bg-white'}>
          <h2 className={'text-xl font-medium'}>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export const ProductListSkeleton = () => {
  return <div>Loading...</div>
}
