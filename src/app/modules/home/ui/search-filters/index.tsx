'use client'
import Categories from '@/app/modules/home/ui/search-filters/categories'
import SearchInput from '@/app/modules/home/ui/search-filters/search-input'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function SearchFilters() {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  const params = useParams()
  const categoryParam = params.category as string | undefined
  const activeCategory = categoryParam || 'all'

  const activeCategoryData = data.find((category) => category.slug === activeCategory)
  const activeCategoryColor = activeCategoryData?.color
  return (
    <div
      className={'px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'}
      style={{
        backgroundColor: '#F5F5F5',
      }}
    >
      <SearchInput />
      <div className={'hidden lg:block'}>
        <Categories data={data} />
      </div>
    </div>
  )
}

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className={'px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'}
      style={{
        backgroundColor: '#F5F5F5',
      }}
    >
      <SearchInput disabled />
      <div className={'hidden lg:block'}>
        <div className={'h-10'} />
      </div>
    </div>
  )
}
