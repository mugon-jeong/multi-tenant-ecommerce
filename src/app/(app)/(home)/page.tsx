'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
export default async function Home() {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.auth.session.queryOptions())
  return (
    <div className={'flex flex-col gap-4'}>
      <div>
        <Button variant={'elevated'}>I am a button</Button>
      </div>
      <div>
        <Input placeholder={'I am an input'} />
      </div>
      <Progress value={50} />
    </div>
  )
}
