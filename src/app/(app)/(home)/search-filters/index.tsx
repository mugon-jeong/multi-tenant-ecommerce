import Categories from '@/app/(app)/(home)/search-filters/categories'
import SearchInput from '@/app/(app)/(home)/search-filters/search-input'
import type { CustomCategory } from '@/app/(app)/(home)/types'

interface Props {
  data: CustomCategory[]
}
export default function SearchFilters({ data }: Props) {
  return (
    <div className={'px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'}>
      <SearchInput data={data} />
      <div className={'hidden lg:block'}>
        <Categories data={data} />
      </div>
    </div>
  )
}
