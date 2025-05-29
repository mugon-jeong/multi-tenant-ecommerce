'use client'
import { useCart } from '@/app/modules/checkout/hooks/use-cart'
import CheckoutItem from '@/app/modules/checkout/ui/components/checkout-item'
import { generateTenantURL } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface Props {
  tenantSlug: string
}
export default function CheckoutView({ tenantSlug }: Props) {
  const { productIds, clearAllCarts, removeProduct } = useCart(tenantSlug)
  const trpc = useTRPC()
  const { data, error } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  )
  useEffect(() => {
    if (error?.data?.code === 'NOT_FOUND') {
      clearAllCarts()
      toast.warning('Invalid products found, Cart cleared')
    }
  }, [error, clearAllCarts])
  return (
    <div className={'lg:pt-16 pt-4 px-4 lg:px-12'}>
      <div className={'grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16'}>
        <div className={'lg:col-span-4'}>
          <div className={'border rounded-md overflow-hidden bg-white'}>
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                id={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={`${generateTenantURL(product.tenant.slug)}`}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className={'lg:col-span-3'}>checkout sidebar</div>
      </div>
    </div>
  )
}
