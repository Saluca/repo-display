# GitHub Card

A modern, responsive web application that displays GitHub repositories in a card-based grid layout. Built with Next.js 16 and React 19.

## Features

- **Repository Grid Display**: View GitHub repositories in a clean, responsive grid
- **Search Functionality**: Filter repositories by name in real-time
- **Repository Details**: Display repository name, description, star count, and programming language
- **Direct Links**: Click any card to visit the repository on GitHub

## Getting Started

```
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Runs at :http://localhost:3000

## Configuration

The app currently fetches repositories from the GitHub user "Saluca". To display repositories from a different user, modify the `getRepo()` function in `src/app/page.tsx`:

```typescript
const response = await fetch(
  `https://api.github.com/users/YOUR_USERNAME/repos`,
  {
    next: { revalidate: 3600 },
  },
);
```
