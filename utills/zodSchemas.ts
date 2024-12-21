import { number, z } from 'zod'
import prisma from './db'

export const productSchema = z.object({
  name: z.string().min(5, 'Please add more like 4 characters'),
  description: z.string().min(10, 'Min is 10 characters').max(1000, 'Max is 1000 characters'),
  status: z.enum(['draft', 'published', 'archived']),
  price: z.number().min(1, 'price must be at least 1'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  category: z.enum([
    'velvet_calm',
    'velvet_comfort',
    'velvet_glow',
    'velvet_aura',
    'velvet_bloom',
    'velvet_essence',
    'velvet_other',
  ]),
  isFeatured: z.boolean().optional(),
})
export type ProductSchemaType = z.infer<typeof productSchema>

export const bannerSchema = z.object({
  title: z.string().optional(),
  imageString: z.string().url('Please insert image'),
  index: z.number().optional(),
})
export type BannerSchema = z.infer<typeof bannerSchema>
