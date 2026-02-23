# [AniHub](https://anihub-app.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)

AniHub is a better MyAnimeList alternative for tracking anime series and movies you watched and discussing them with other people! AniHub is a fullstack platform built for the anime community, by the anime community.

## Tech stack

This is a [Next.js](https://nextjs.org) app hosted on [Vercel](https://vercel.com) and [Neon](https://neon.com), built with [React](https://react.dev), [TypeScript](https://typescriptlang.org), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), and [Tailwind](https://tailwindcss.com), and the libraries [Better Auth](https://www.better-auth.com), [Framer Motion](https://motion.dev), and [React Icons](https://react-icons.github.io). The app folder contains the frontend page routes and the backend API endpoints. The components folder contains frontend layout and UI components. The prisma folder contains the Prisma schema, and the lib and types folders contain extra stuff for setup. Finally, the public folder contains frontend assets like icons and logos.

## Quick start

To host AniHub on your machine for local development or other purposes, simply follow these steps below:

1. Clone the GitHub [repository](https://github.com/tonymac129/anihub) using the command
   ```bash
   git clone https://github.com/tonymac129/anihub.git
   ```
2. Open it with your favorite code editor or through the terminal
3. Create the file `.env` at the root folder and initialize the following variables:
   ```
   DATABASE_URL=your_pooled_neon_connection_string
   DIRECT_URL=your_neon_connection_string
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   GITHUB_CLIENT_ID=your_github_id
   GITHUB_CLIENT_SECRET=your_github_secret
   ```
4. If you don't have a local Postgres database or a cloud Neon/Supabase cluster/connection string, only the landing page will be available because of obvious reasons
5. Open the terminal and run the commands

   ```bash
   npm install
   npm run dev
   ```

   or if you have Yarn

   ```bash
   yarn install
   yarn dev
   ```

   to start the Next.js dev server at localhost:3000 and see the magic!

## Contribution

Any kind of contribution is welcome, but please follow the guideline below!

- Submit an issue if there's a bug/issue or if you want to suggest new features/subscriptions to be added.
- Submit a pull request if you want to add or improve the code base!
- Commit messages should be specific and address the issue
- Please don't submit random issues that aren't specific
- Please don't submit pull requests that "fix typo" or "improve formatting"
