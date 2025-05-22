import config from '@/payload.config'
import { getPayload } from 'payload'

const createDummyUsers = async () => {
  const payload = await getPayload({ config })

  // 더미 사용자 5명 정보
  const dummyUsers = [
    { username: 'user1', email: 'user1@example.com' },
    { username: 'user2', email: 'user2@example.com' },
    { username: 'user3', email: 'user3@example.com' },
    { username: 'user4', email: 'user4@example.com' },
    { username: 'user5', email: 'user5@example.com' },
  ]

  for (const user of dummyUsers) {
    // 각 사용자에 대한 테넌트 생성
    const userTenant = await payload.create({
      collection: 'tenants',
      data: {
        name: user.username,
        slug: user.username,
        stripeAccountId: 'test',
      },
    })

    // 사용자 생성
    await payload.create({
      collection: 'users',
      data: {
        email: user.email,
        username: user.username,
        password: 'test001',
        tenants: [
          {
            tenant: userTenant.id,
          },
        ],
      },
    })

    console.log(`Created user: ${user.username} with password: test001`)
  }
}

// 실행
await createDummyUsers()
  .then(() => {
    console.log('All dummy users created successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error creating dummy users:', error)
    process.exit(1)
  })
