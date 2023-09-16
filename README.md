This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What is this project?

This is supposed to be a template for the creation of frontend websites that talk interact with the CKAN Api to display results. you can just clone this code to a repo and set up the relevant environment variables, which are:

1. DMS - This is the url of the CKAN Instance in which you are going to fetch data
2. DATA_API_URL - This website uses the DataAPI Project to display resource data, so you need to have a instance running that will return the datastore content of your CKAN Instance
3. ANALYTICS_SRC & ANALYTICS_ID - These are UMAMI Values that you need for analytics.
4. IRS_TOKEN - This project uses Incremental Static Generation, see more [here](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration), for that to work you are going to need your CKAN Instance to have the project /datopian/ckanext-portaljs-improvements, The CKANEXT**PORTALJS_IMPROVEMENTS**PORTAL_SECRET config value in CKAN and this value should match.

# How is this project different from portal-ni/portal-birmingham...

1. We use ISR, so almost all the pages are built previously, which mean that the loading is almost instantanous, and the lighthouse score are much higher
2. We use the DataAPI and the relevant Data-Explorer, so users can filter the explored data more easily
3. We use Typescript from the ground up, which improves safety and developer experience(auto complete for instance)
4. The flow of data in the app is much easier to track, everything gets fetched on the server and then returned to the client, there arent any fetching of data inside components as before

# Things missing that could be improved

1. We dont have support for the showcase extension, which is something that lots of clients want, this is present on both portal-ni and portal-birmingham
2. We dont have a nice CMS support on the Monorepo, because we use NetlifyCMS which requires write permissions to publishers

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
