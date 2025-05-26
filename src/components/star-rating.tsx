import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'

const MAX_RATING = 5
const MIN_RATING = 0

interface Props {
  rating: number
  className?: string
  iconClassName?: string
  text?: string
}

export default function StarRating({ text, rating, iconClassName, className }: Props) {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING))
  return (
    <div className={cn('flex, items-center gap-x-1', className)}>
      {Array.from({ length: MAX_RATING }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <StarIcon key={i} className={cn('size-4', i < safeRating ? 'fill-black' : '', iconClassName)} />
      ))}
      {text && <p>{text}</p>}
    </div>
  )
}
