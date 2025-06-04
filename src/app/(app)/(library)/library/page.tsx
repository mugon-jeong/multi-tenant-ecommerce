import LibraryView from '@/app/modules/library/ui/views/library-view'
import { DEFAULT_LIMIT } from '@/constants'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function Page() {
  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
    })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>
  )
}
