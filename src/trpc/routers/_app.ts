import { authRouter } from '@/app/modules/auth/server/procedures'
import { categoriesRouter } from '@/app/modules/categories/server/procedures'
import { productsRouter } from '@/app/modules/products/server/procedures'
import { tagsRouter } from '@/app/modules/tags/server/procedures'
import { createTRPCRouter } from '../init'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  products: productsRouter,
  categories: categoriesRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
