# Çanakkale Escort Site

A Next.js application with PostgreSQL database for managing escort profiles.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or Vercel Postgres)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your PostgreSQL connection string:
```
DATABASE_URL="postgresql://user:password@host:port/database"
```

3. Run database migrations:
```bash
npx prisma migrate dev --name init
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Database Setup

### Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a database: `createdb escort_site`
3. Update `DATABASE_URL` in `.env`

### Vercel Postgres (Recommended for Deployment)
1. Go to Vercel dashboard → Storage → Create Database
2. Select Postgres
3. Copy the connection string to your environment variables

## Deploy on Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (from Vercel Postgres or external PostgreSQL)
4. Deploy

Vercel will automatically run the build and deploy your application.

## Project Structure

- `src/app/` - Next.js app router pages
- `src/app/admin/` - Admin dashboard for managing profiles
- `src/app/actions/` - Server actions for database operations
- `src/lib/prisma.ts` - Prisma client singleton for serverless environments
- `prisma/schema.prisma` - Database schema
