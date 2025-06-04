import {cn, formatCurrency} from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  isLast?: boolean
  imageUrl?: string | null | undefined
  name: string
  productUrl: string
  tenantUrl: string
  price: number
  onRemove: () => void
  tenantName: string
}
export default function CheckoutItem({ isLast, imageUrl, name, productUrl, tenantUrl, price, onRemove, tenantName }: Props) {
  return (
    <div className={cn('grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b', isLast && 'border-b-0')}>
      <div className={'overflow-hidden border-r'}>
        <div className={'relative aspect-square h-full'}>
          <Image alt={name} src={imageUrl || '/placeholder.png'} fill className={'object-cover'} />
        </div>
      </div>
      <div className={'py-4 flex flex-col justify-between'}>
        <div>
          <Link href={productUrl}>
            <h4 className={'font-bold underline'}>{name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <p className={'font-medium underline'}>{tenantName}</p>
          </Link>
        </div>
      </div>
      <div className={"py-4 flex flex-col justify-between"}>
        <p className={"font-medium"}>
          {formatCurrency(price)}
        </p>
        <button className={"underline font-medium"} onClick={onRemove} type={"button"}>
          Remove
        </button>
      </div>
    </div>
  )
}
