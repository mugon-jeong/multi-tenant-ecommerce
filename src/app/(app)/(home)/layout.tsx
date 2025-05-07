import Footer from '@/app/(app)/(home)/footer'
import Navbar from '@/app/(app)/(home)/navbar'
import SearchFilters, { SearchFiltersSkeleton } from '@/app/(app)/(home)/search-filters'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type React from 'react'
import { Suspense } from 'react'

interface Props {
  children: React.ReactNode
}
export default async function Layout({ children }: Props) {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className={'flex flex-col min-h-screen'}>
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className={'flex-1 bg-[#F4F4F0]'}>{children}</div>
      <Footer />
    </div>
  )
}
