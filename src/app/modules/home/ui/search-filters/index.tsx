'use client'
import { DEFAULT_BG_COLOR } from '@/app/modules/home/constants'
import BreadcrumbsNavigation from '@/app/modules/home/ui/search-filters/breadcrumbs-navigation'
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
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR
  const activeCategoryName = activeCategoryData?.name || null
  const activeSubcategory = params.subcategory as string | undefined
  const activeSubcategoryName =
    activeCategoryData?.subcategories?.find((subcategory) => subcategory.slug === activeSubcategory)?.name || null

  return (
    <div
      className={'px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'}
      style={{
        backgroundColor: activeCategoryColor,
      }}
    >
      <SearchInput />
      <div className={'hidden lg:block'}>
        <Categories data={data} />
      </div>
      <BreadcrumbsNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        activeSubcategoryName={activeSubcategoryName}
      />
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
