# Liftshops

An e-commerce platform built with Next.js 16, TypeScript, and modern frontend technologies, designed to showcase frontend development skills while providing a functional second-hand marketplace experience.

## Technologies Used

### Core Technologies

- **[Next.js 16](https://nextjs.org/)** (App Router) - React framework with server-side rendering and static site generation
- **[React 19](https://react.dev/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Strongly typed JavaScript for better code quality and developer experience
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development

### State Management & Data Fetching

- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management for client-side state
- **[React Query](https://tanstack.com/query/latest)** - Data fetching, caching, and synchronization library

### APIs & Services

- **[FakeStoreAPI](https://fakestoreapi.com/)** - Mock REST API for product data, categories, and cart functionality

### Development Tools

- **ESLint** - Code linting for consistent code quality
- **PostCSS** - CSS transformation tool
- **Babel React Compiler** - Optimizing React components
- **VSCode AI/Copilot** - Used for planning, troubleshooting, feature implementation suggestions & research tool.

## Key Features & Principles

### Core Principles

- **Server-Side Rendering (SSR)**: Improved SEO and performance
- **Component-Based Architecture**: Reusable, maintainable components
- **Type Safety**: TypeScript throughout the application
- **State Management**: Zustand for client state, React Query for server state
- **Responsive Design**: Fully responsive approach with TailwindCSS

### Implemented Features

- **Product Catalog**: Browse products with filtering by category
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout Process**: Multi-step checkout flow
- **Order Confirmation**: Order status tracking
- **Category Navigation**: Dynamic category filtering
- **Search Functionality**: Product search with debouncing

### Technical Highlights

- **Dynamic Routes**: `/products/[id]` for individual product pages
- **Server Components**: Maximizing SSR benefits
- **Client Components**: Interactive elements with Zustand state
- **Data Fetching**: React Query for caching and synchronization
- **Styling**: TailwindCSS utility classes for rapid development

## Development Setup

### Prerequisites

- Node.js v18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Amuga/ecommerce-frontend-showcase.git
cd ecommerce-frontend-showcase
```

2. Install depedencies:

```bash
npm install
#or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
#or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
