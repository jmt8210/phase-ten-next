This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Montserrat, a custom Google Font.

## Prisma

Set environment variables for postgres (requires postgres running on port 5432)

Create a file `.env.local`:
```bash
DATABASE_USERNAME=<DB_USER>
DATABASE_PASSWORD=<DB_PASS>
```

Generate database/handle migrations:

```bash
npx prisma migrate dev
```
