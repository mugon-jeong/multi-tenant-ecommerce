import Navbar from '@/app/modules/checkout/ui/components/navbar'
import Footer from '@/app/modules/tenants/ui/components/footer'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: Promise<{ slug: string }>
}
export default async function Layout({ params, children }: Props) {
  const { slug } = await params
  return (
    <div className={'min-h-screen bg-[#F4F4F0] flex flex-col'}>
      <Navbar slug={slug} />
      <div className={'flex-1'}>
        <div className={'max-w-(--breakpoint-xl) mx-auto'}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
