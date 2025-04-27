import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import configPromise from '@payload-config'
import { aws4 } from 'mongodb/src/deps'
import Image from 'next/image'
import { getPayload } from 'payload'
export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
  })
  return (
    <div className={'flex flex-col gap-4'}>
      <div>
        <Button variant={'elevated'}>I am a button</Button>
      </div>
      <div>{JSON.stringify(data)}</div>
      <div>
        <Input placeholder={'I am an input'} />
      </div>
      <Progress value={50} />
    </div>
  )
}
