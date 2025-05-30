import Footer from '@/app/modules/tenants/ui/components/footer'
import Navbar, { NavbarSkeleton } from '@/app/modules/tenants/ui/components/navbar'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { type ReactNode, Suspense } from 'react'

interface Props {
  children: ReactNode
  params: Promise<{ slug: string }>
}
export default async function Layout({ params, children }: Props) {
  const { slug } = await params
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug: slug,
    })
  )
  return (
    <div className={'min-h-screen bg-[#F4F4F0] flex flex-col'}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar slug={slug} />
        </Suspense>
      </HydrationBoundary>
      <div className={'flex-1'}>
        <div className={'max-w-(--breakpoint-xl) mx-auto'}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
