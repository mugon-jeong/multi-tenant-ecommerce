import type { AppRouter } from '@/trpc/routers/_app'
import type { inferRouterOutputs } from '@trpc/server'

export type ReviewGetOneOutput = inferRouterOutputs<AppRouter>['reviews']['getOne']
