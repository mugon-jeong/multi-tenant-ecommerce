import type { Category } from '@/payload-types'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: 'categories',
      depth: 1, // Populate subcategories, subcategories.[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: 'name',
    })

    return data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs || []).map((sub) => ({
        // Because of 'depth:1' we are confident "doc" will be a type of "Category"
        ...(sub as Category),
      })),
    }))
  }),
})
