import CategoryDropdown from '@/app/(app)/(home)/search-filters/category-dropdown'
import type { Category } from '@/payload-types'

interface Props {
  data: any
}
export default function Categories({ data }: Props) {
  return (
    <div className={'relative w-full'}>
      <div className={'flex flex-nowrap items-center'}>
        {data.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
