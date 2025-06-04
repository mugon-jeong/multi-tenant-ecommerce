import path from 'node:path'
import { fileURLToPath } from 'node:url'
// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Orders } from '@/collections/Orders'
import { Reviews } from '@/collections/Reviews'
import { Tenants } from '@/collections/Tenants'
import { isSuperAdmin } from '@/lib/access'
import type { Config } from '@/payload-types'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Products, Tags, Tenants, Orders, Reviews],
  // cookiePrefix: 'funroad',
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    multiTenantPlugin<Config>({
      collections: {
        products: {},
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: isSuperAdmin,
    }),
    // storage-adapter-placeholder
  ],
})
