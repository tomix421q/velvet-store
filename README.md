### npx create-next-app@latest

### shadcn installs -> sidebar dropdownmenu sheet card table select Textarea Switch Dialog Avatar carousel

### npm install embla-carousel-autoplay --save

### prisma

- npm install prisma --save-dev
- npx prisma
- npx prisma init
- datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
  }
- DATABASE_URL="postgresql://neondb_owner:\*\*\*\*@ep-broad-pond-a2xwc2by-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require" <--- NEON ENV

- utills/db -> (create singleton)
  import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
return new PrismaClient()
}

declare const globalThis: {
prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

### kinde auth

- npm i @kinde-oss/kinde-auth-nextjs

### react hook form && zod

- npm install react-hook-form
- npm i @hookform/resolvers
- npm i zod
