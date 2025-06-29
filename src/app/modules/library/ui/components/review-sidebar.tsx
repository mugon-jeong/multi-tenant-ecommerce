'use client'
import ReviewForm from '@/app/modules/library/ui/components/review-form'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  productId: string
}
export default function ReviewSidebar({ productId }: Props) {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.reviews.getOne.queryOptions({
      productId: productId,
    })
  )
  return <ReviewForm productId={productId} initialData={data} />
}
