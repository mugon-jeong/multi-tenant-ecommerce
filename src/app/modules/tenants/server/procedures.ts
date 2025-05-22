import type { Media, Tenant } from '@/payload-types'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const tenantsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: 'tenants',
        where: { slug: { equals: input.slug } },
        depth: 1,
        limit: 1,
        pagination: false,
      })
      const tenant = data.docs[0]
      if (!tenant) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'No tenant found.' })
      }
      return tenant as Tenant & { image: Media | null }
    }),
})
