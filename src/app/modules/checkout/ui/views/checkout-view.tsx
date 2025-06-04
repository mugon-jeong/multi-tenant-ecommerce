'use client'
import { useCart } from '@/app/modules/checkout/hooks/use-cart'
import { useCheckoutStats } from '@/app/modules/checkout/hooks/use-checkout-stats'
import CheckoutItem from '@/app/modules/checkout/ui/components/checkout-item'
import CheckoutSidebar from '@/app/modules/checkout/ui/components/checkout-sidebar'
import { generateTenantURL } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { InboxIcon, LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface Props {
  tenantSlug: string
}

export default function CheckoutView({ tenantSlug }: Props) {
  const router = useRouter()
  const [states, setStates] = useCheckoutStats()
  const { productIds, removeProduct, clearCart } = useCart(tenantSlug)
  const trpc = useTRPC()
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  )

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({ success: false, cancel: false })
      },
      onSuccess: (data) => {
        window.location.href = data.url
      },
      onError: (error) => {
        if (error.data?.code === 'UNAUTHORIZED') {
          router.push('/sign-in')
        }
        toast.error(error.message)
      },
    })
  )

  useEffect(() => {
    if (states.success) {
      setStates({ success: false, cancel: false })
      clearCart()
      router.push('/products')
    }
  }, [states.success, clearCart, router, setStates])

  useEffect(() => {
    if (error?.data?.code === 'NOT_FOUND') {
      clearCart()
      toast.warning('Invalid products found, Cart cleared')
    }
  }, [error, clearCart])

  if (isLoading) {
    return (
      <div className={'lg:pt-16 pt-4 px-4 lg:px-12'}>
        <div
          className={
            'border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg'
          }
        >
          <LoaderIcon className={'text-muted-foreground animate-spin'} />
        </div>
      </div>
    )
  }
  if (data?.totalDocs === 0) {
    return (
      <div className={'lg:pt-16 pt-4 px-4 lg:px-12'}>
        <div
          className={
            'border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg'
          }
        >
          <InboxIcon />
          <p className={'text-base font-medium'}>No products found</p>
        </div>
      </div>
    )
  }
  return (
    <div className={'lg:pt-16 pt-4 px-4 lg:px-12'}>
      <div className={'grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16'}>
        <div className={'lg:col-span-4'}>
          <div className={'border rounded-md overflow-hidden bg-white'}>
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                tenantName={product.tenant.name}
                tenantUrl={`${generateTenantURL(product.tenant.slug)}`}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className={'lg:col-span-3'}>
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={() => {
              purchase.mutate({
                tenantSlug: tenantSlug,
                productIds: productIds,
              })
            }}
            isCanceled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  )
}
