import { isSuperAdmin } from '@/lib/access'
import type { Tenant } from '@/payload-types'
import {} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true

      const tenant = req.user?.tenants?.[0]?.tenant as Tenant

      return Boolean(tenant.stripeDetailsSubmitted)
    },
  },
  admin: {
    useAsTitle: 'name',
    description: 'You must verify your account before creating products',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Price in USD',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'refundPolicy',
      type: 'select',
      options: ['30-day', '14-day', '7-day', '3-day', '1-day', 'no-refunds'],
      defaultValue: '30-day',
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description:
          'Protected content only visible to customers after purchase. Add product documentation, downloadable files, getting started guides, and bonus materials. Supports Markdown formatting',
      },
    },
    {
      name: 'isArchived',
      label: 'Archive',
      type: 'checkbox',
      admin: {
        description: 'If checked, this product will be archived',
      },
    },
    {
      name: 'isPrivate',
      label: 'Private',
      type: 'checkbox',
      admin: {
        description: 'If checked, this product will not be shown on the public storefront',
      },
    },
  ],
}
