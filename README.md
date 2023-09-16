This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What is this project?

This is supposed to be a template for the creation of frontend websites that talk interact with a multitenant CKAN instance to display results. you can just clone this code to a repo and set up the relevant environment variables, which are:

1. NEXT_PUBLIC_ORG - This is the name of the main org used in the project
2. NEXT_PUBLIC_DMS - This is the URL of the CKAN instance used

# Testing

Testing can be done using the cypress commands, just start running the app(ideally on production mode as it is faster) and then on a separate terminal run `yarn test` this should trigger cypress, you can also run `yarn text-browser` which is going to open the cypress web ui.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
