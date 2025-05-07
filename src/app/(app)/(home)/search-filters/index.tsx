'use client'
import Categories from '@/app/(app)/(home)/search-filters/categories'
import SearchInput from '@/app/(app)/(home)/search-filters/search-input'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function SearchFilters() {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())
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
