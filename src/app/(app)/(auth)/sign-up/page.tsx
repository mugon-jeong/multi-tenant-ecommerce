import SignUpView from '@/app/modules/auth/ui/views/sign-up-view'
import { caller } from '@/trpc/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const session = await caller.auth.session()
  if (session.user) {
    redirect('/')
  }
  return <SignUpView />
}
