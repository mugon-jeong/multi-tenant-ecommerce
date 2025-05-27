import { useCart } from '@/app/modules/checkout/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { cn, generateTenantURL } from '@/lib/utils'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  className?: string
  tenantSlug: string
  hideIfEmpty?: boolean
}

export default function CheckoutButton({ tenantSlug, hideIfEmpty, className }: Props) {
  const { totalItems } = useCart(tenantSlug)
  if (hideIfEmpty && totalItems === 0) return null
  return (
    <Button variant={'elevated'} asChild className={cn('bg-white', className)}>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ''}
      </Link>
    </Button>
  )
}
