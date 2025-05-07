import type { CategoriesGetManyOutput, CategoriesGetManyOutputSingle } from '@/app/modules/categories/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.categories.getMany.queryOptions())

  const router = useRouter()
  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutputSingle | null>(null)

  // If we have parent categories, show those, otherwise show root categories
  const currentCategories = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setParentCategories(null)
    setSelectedCategory(null)
    onOpenChange(open)
  }

  const handleCategoryClick = (category: CategoriesGetManyOutputSingle) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput)
      setSelectedCategory(category)
    } else {
      // This is a leaf category (no subcategory)
      if (parentCategories && selectedCategory) {
        // This is a subcategory - navigate to /category/subcategory
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      } else {
        // This is a main category - navigate to /category
        if (category.slug === 'all') {
          router.push('/')
        } else {
          router.push(`/${category.slug}`)
        }
      }
      handleOpenChange(false)
    }
  }

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null)
      setSelectedCategory(null)
    }
  }

  const backgroundColor = selectedCategory?.color || 'white'

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={'left'} className={'p-0 transition-none'} style={{ backgroundColor }}>
        <SheetHeader className={'p-4 border-b'}>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className={'flex flex-col overflow-y-auto h-full pb-2'}>
          {parentCategories && (
            <button
              type={'button'}
              onClick={handleBackClick}
              className={'w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'}
            >
              <ChevronLeftIcon className={'size-4 mr-2'} />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              type={'button'}
              onClick={() => handleCategoryClick(category)}
              className={
                'w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium'
              }
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && <ChevronRightIcon className={'size-4'} />}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
