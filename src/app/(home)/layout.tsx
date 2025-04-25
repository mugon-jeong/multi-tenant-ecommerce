import Footer from '@/app/(home)/footer'
import Navbar from '@/app/(home)/navbar'
import type React from 'react'

interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <div className={'flex flex-col min-h-screen'}>
      <Navbar />
      <div className={'flex-1 bg-[#F4F4F0]'}>{children}</div>
      <Footer />
    </div>
  )
}
