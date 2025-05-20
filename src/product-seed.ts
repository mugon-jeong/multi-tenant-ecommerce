import config from '@/payload.config'
import { getPayload } from 'payload'

const getRandomPrice = (min: number, max: number): number => {
  return +(Math.random() * (max - min) + min).toFixed(2)
}

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

const generateDescription = (productName: string, categoryName: string): string => {
  const descriptions = [
    `최고의 ${productName}입니다. ${categoryName} 분야에서 인정받는 제품입니다.`,
    `${categoryName} 전문가들이 추천하는 ${productName}. 지금 구매하세요!`,
    `${productName}으로 ${categoryName} 실력을 한 단계 업그레이드하세요.`,
    `${categoryName} 학습에 필수적인 ${productName}. 전문가의 노하우가 담겨있습니다.`,
    `${productName}은 ${categoryName} 입문자부터 전문가까지 모두에게 도움이 됩니다.`,
  ]

  return getRandomElement(descriptions)
}

type ProductTemplates = {
  [key: string]: string[]
}

// RefundPolicy 타입 정의 - Products.ts 파일의 옵션과 정확히 일치해야 함
type RefundPolicy = '30-day' | '14-day' | '7-day' | '3-day' | '1-day' | 'no-refunds'

const productSeeds = async () => {
  const payload = await getPayload({ config })

  // 모든 카테고리 가져오기
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  const categoryIds = categories.docs.map((cat) => cat.id)

  // 제품 이름 템플릿
  const productTemplates: ProductTemplates = {
    'business-money': [
      '비즈니스 플랜 작성 가이드',
      '주식 투자 전략',
      '부동산 투자 비법서',
      '창업 성공 마스터 클래스',
      '재테크 완전정복',
      '주식차트 분석법',
      '부자되는 습관',
      '경제 위기 극복 가이드',
      '세금 절약 비법',
    ],
    'software-development': [
      '웹개발 마스터 코스',
      '리액트 완전정복',
      '파이썬 개발자 로드맵',
      'API 설계 가이드',
      '클린 코드 작성법',
      '모바일 앱 개발 입문',
      '게임 개발 기초',
      '알고리즘 문제 해결 전략',
      '풀스택 개발자 되기',
      '데이터베이스 설계 원칙',
    ],
    'writing-publishing': [
      '베스트셀러 작성법',
      '출판 성공 전략',
      '효과적인 스토리텔링',
      '블로그 수익화 가이드',
      '카피라이팅 마스터 클래스',
      '소설 구조 설계',
      '논문 작성 가이드',
      '콘텐츠 마케팅 전략',
    ],
    education: [
      '온라인 학습 패키지',
      '시험 대비 완벽 가이드',
      '언어 학습 플랫폼',
      '학습 능력 향상 방법',
      '암기력 향상 기법',
      '공부 습관 형성 가이드',
      '수능 완벽 대비',
      '영어 회화 마스터 코스',
    ],
    'self-improvement': [
      '생산성 향상 시스템',
      '자기계발 마스터 플랜',
      '마인드풀니스 가이드',
      '커리어 성장 로드맵',
      '목표 달성 시스템',
      '습관 형성 방법론',
      '의사결정 능력 향상',
      '시간 관리 마스터 클래스',
    ],
    'fitness-health': [
      '30일 피트니스 챌린지',
      '건강한 식단 가이드',
      '홈트레이닝 완전정복',
      '요가 초보자 코스',
      '명상과 스트레스 관리',
      '체중 감량 가이드',
      '근력 운동 기초',
      '영양소 완전정복',
    ],
    design: [
      'UI/UX 디자인 포트폴리오',
      '그래픽 디자인 템플릿 모음',
      '브랜딩 디자인 가이드',
      '웹디자인 트렌드',
      '로고 디자인 마스터 클래스',
      '타이포그래피 완전정복',
      '색상 이론 가이드',
      '디자인 시스템 구축법',
    ],
    'drawing-painting': [
      '인체 드로잉 마스터',
      '수채화 기초부터 심화까지',
      '디지털 아트 워크샵',
      '풍경화 그리기',
      '캐릭터 디자인 가이드',
      '유화 기법 완전정복',
      '만화 그리기 입문',
      '색연필 드로잉 기법',
    ],
    music: [
      '작곡 마스터클래스',
      '기타 연주 기초',
      '음악 이론 완전정복',
      '녹음 기술 가이드',
      '보컬 트레이닝 코스',
      '미디 프로그래밍 입문',
      '음악 프로듀싱 가이드',
      'DJ 기술 마스터',
    ],
    photography: [
      '풍경 사진 마스터 클래스',
      '인물 사진 가이드',
      '제품 사진 촬영법',
      '라이팅 테크닉',
      '모바일 사진 고급 기법',
      '사진 편집 워크플로우',
      '스트리트 포토그래피 가이드',
      '드론 사진 입문',
    ],
  }

  const defaultProducts = [
    '기초 입문 가이드',
    '전문가 코스',
    '마스터 클래스',
    '완전정복 패키지',
    '실전 훈련 프로그램',
    '핵심 요약 노트',
    '문제 해결 전략',
    '단계별 학습 가이드',
    '필수 템플릿 모음',
    '비법 노트',
    '집중 특강',
    '실습 워크북',
  ]

  // 정확한 리터럴 타입으로 정의
  const refundPolicies: RefundPolicy[] = ['30-day', '14-day', '7-day', '3-day', '1-day', 'no-refunds']

  // 100개의 제품 생성
  for (let i = 0; i < 100; i++) {
    // 랜덤 카테고리 선택
    const categoryIndex = Math.floor(Math.random() * categoryIds.length)
    const categoryId = categoryIds[categoryIndex]
    const selectedCategory = categories.docs[categoryIndex]

    // 카테고리에 맞는 제품명 생성
    let productName = ''
    const parentSlug = selectedCategory.parent
      ? categories.docs.find((c) => c.id === selectedCategory.parent)?.slug
      : selectedCategory.slug

    const categoryName = selectedCategory.name

    if (parentSlug && productTemplates[parentSlug]) {
      productName = getRandomElement(productTemplates[parentSlug])
    } else {
      productName = `${categoryName} ${getRandomElement(defaultProducts)}`
    }

    // 제품 생성
    await payload.create({
      collection: 'products',
      data: {
        name: productName,
        description: generateDescription(productName, categoryName),
        price: getRandomPrice(9.99, 199.99),
        category: categoryId,
        refundPolicy: getRandomElement(refundPolicies) as RefundPolicy,
      },
    })
  }

  console.log('제품 시드 데이터 생성 완료: 100개 제품이 생성되었습니다.')
}

// 함수 실행
await productSeeds()
process.exit(0)
