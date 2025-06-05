## ✨ 주요 기능
- **🏬 다중 테넌트 아키텍처**: 하나의 플랫폼에서 여러 판매자 지원
- **🌐 판매자 서브도메인**: 각 판매자를 위한 고유 서브도메인 제공
- **🎨 맞춤형 상점 디자인**: 판매자별 브랜딩 및 스토어프론트 커스터마이징
- **💰 자동 플랫폼 수수료**: 플랫폼 수수료 자동 계산 및 처리
- **⭐ 상품 평가 및 리뷰**: 사용자 피드백 시스템
- **📚 구매 라이브러리**: 사용자별 구매 내역 관리
- **🧑‍💼 역할 기반 접근 제어**: 관리자, 판매자, 사용자 권한 관리
- **🛠️ 관리자 대시보드**: 플랫폼 관리를 위한 종합 도구
- **🧾 판매자 대시보드**: 판매자를 위한 상품 및 주문 관리
- **🗂️ 카테고리 및 상품 필터링**: 효율적인 상품 탐색
- **🔍 검색 기능**: 빠른 상품 검색
- **🖼️ 이미지 업로드 지원**: 상품 이미지 관리

## 🛠️ 기술 스택
### 프론트엔드
- **⚙️ Next.js 15**: 고성능 React 프레임워크
- **🎨 TailwindCSS V4**: 유틸리티 우선 CSS 프레임워크
- **💅 ShadcnUI**: 스타일링 컴포넌트 라이브러리
- **🚀 React 19**: 최신 React 버전
- **📊 Recharts**: 데이터 시각화 라이브러리
- **🎠 Embla Carousel**: 캐러셀 컴포넌트
- **🌙 next-themes**: 다크/라이트 테마 지원

### 백엔드
- **🧱 Payload CMS**: 헤드리스 CMS 플랫폼
- **📦 MongoDB**: 데이터베이스 (via @payloadcms/db-mongodb)
- **🔄 TanStack Query**: 서버 상태 관리
- **🛣️ tRPC**: 타입 안전한 API 통합
- **✅ Zod**: 스키마 검증

### 유틸리티
- **📝 React Hook Form**: 폼 관리
- **⚡ Sonner**: 토스트 알림
- **📅 date-fns**: 날짜 처리
- **🔐 TypeScript**: 타입 안전성

### env
```plain text
DATABASE_URI
PAYLOAD_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
BLOB_READ_WRITE_TOKEN

NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_ROOT_DOMAIN
NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING
```