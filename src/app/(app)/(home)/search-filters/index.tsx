import Categories from '@/app/(app)/(home)/search-filters/categories'
import SearchInput from '@/app/(app)/(home)/search-filters/search-input'

interface Props {
  data: any
}
export default function SearchFilters({ data }: Props) {
  return (
    <div className={'px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'}>
      <SearchInput />
      <Categories data={data} />
    </div>
  )
}
