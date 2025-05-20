import type { Category } from '@/payload-types'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import type { Where } from 'payload'
import { z } from 'zod'

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({ category: z.string().nullable().optional() }))
    .query(async ({ ctx, input }) => {
      const where: Where = {}
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: 'categories',
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        })
        console.log(JSON.stringify(categoriesData, null, 2))

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs || []).map((sub) => ({
            // Because of 'depth:1' we are confident "doc" will be a type of "Category"
            ...(sub as Category),
            subcategories: undefined,
          })),
        }))
        const subcategoriesSlugs = []
        const parentCategory = formattedData[0]
        if (parentCategory) {
          subcategoriesSlugs.push(...parentCategory.subcategories.map((sub) => sub.slug))
        }
        where['category.slug'] = {
          in: [parentCategory.slug, ...subcategoriesSlugs],
        }
      }
      return await ctx.db.find({
        collection: 'products',
        depth: 1, // Populate "category" & "image"
        where,
      })
    }),
})
