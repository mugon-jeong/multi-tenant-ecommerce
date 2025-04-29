import Footer from '@/app/(app)/(home)/footer'
import Navbar from '@/app/(app)/(home)/navbar'
import SearchFilters from '@/app/(app)/(home)/search-filters'
import type { CustomCategory } from '@/app/(app)/(home)/types'
import type { Category } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type React from 'react'

interface Props {
  children: React.ReactNode
}
export default async function Layout({ children }: Props) {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
    depth: 1, // Populate subcategories, subcategories.[0] will be a type of "Category"
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: 'name',
  })

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs || []).map((sub) => ({
      // Because of 'depth:1' we are confident "doc" will be a type of "Category"
      ...(sub as Category),
      subcategories: undefined,
    })),
  }))
  return (
    <div className={'flex flex-col min-h-screen'}>
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className={'flex-1 bg-[#F4F4F0]'}>{children}</div>
      <Footer />
    </div>
  )
}
