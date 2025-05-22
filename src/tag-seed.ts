import config from '@/payload.config'
import { getPayload } from 'payload'

// 태그 목록 정의
const tags = [
  { name: '초보자용' },
  { name: '중급자용' },
  { name: '전문가용' },
  { name: '무료' },
  { name: '할인중' },
  { name: '베스트셀러' },
  { name: '신규' },
  { name: '한정판' },
  { name: '인기상품' },
  { name: '추천' },
  { name: '실전' },
  { name: '이론' },
  { name: '온라인' },
  { name: '오프라인' },
  { name: '영상' },
  { name: '텍스트' },
  { name: '인터랙티브' },
  { name: '자격증' },
  { name: '튜토리얼' },
  { name: '워크숍' },
]

// 태그 시드 데이터 생성 함수
const tagSeed = async () => {
  const payload = await getPayload({ config })

  console.log('태그 시드 데이터 생성 시작...')

  // 모든 태그 생성
  for (const tag of tags) {
    await payload.create({
      collection: 'tags',
      data: {
        name: tag.name,
      },
    })
  }

  console.log(`태그 시드 데이터 생성 완료: ${tags.length}개의 태그가 생성되었습니다.`)
}

// 함수 실행
await tagSeed()
process.exit(0)
