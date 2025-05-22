# PortalJS Frontend Starter

> This is a CKAN-based PortalJS website bootstrapped with https://github.com/datopian/portaljs-frontend-starter

## Usage

This is a template for the creation of PortalJS CKAN decoupled frontends, powered by React and Next.js. 

**Demo:** https://portaljs-cloud-frontend-template.vercel.app

### PortalJS Cloud

PortalJS Cloud uses this template for creating new portals.

If you want to quickly get started for free, navigate to https://cloud.portaljs.com and create an account!

PortalJS Cloud will automatically setup a GitHub repository for your portal, based on this template, and deploy it.

Your portal's GitHub repository can be found on your PortalJS Cloud dashboard, and you can raise PRs against it to customize your portal, or let us handle the customization for you by reaching out to us at portaljs@datopian.com.

Learn more at https://portaljs.com/

### Standalone

> [!note]
> In standalone mode, you are going to need your own dedicated CKAN instance.

In order to use this repository in standalone mode (i.e. without PortalJS Cloud), click on the "Use this template" button on the top right corner to replicate this code to a new repo.

Then, you can start customizing it locally by following the development instructions bellow, and/or deploy it somewhere such as on Vercel.

## Development

1) Clone this repository

2) Install the dependencies with `npm i`

3) Create a new `.env` file with:

```bash
# This is the URL of the CKAN instance. Use the example value if you are using PortalJS Cloud.
NEXT_PUBLIC_DMS=https://api.cloud.portaljs.com 

# Leave it empty if you are not using PortalJS Cloud. This is the name of the main organization for your portal in PortalJS Cloud. 
# You can find the this value in the Organizations page in the PortalJS Cloud dashboard.
NEXT_PUBLIC_ORG=my-org 
```

4) Run `npm run dev` to start the development server

5) Access `http://localhost:3000` in your browser

## Customization

This template was developed with Next.js/React and TailwindCSS. 

In order to learn more about how it can be customized, check the following documentations:

- https://react.dev/
- https://nextjs.org/docs
- https://v3.tailwindcss.com/docs/installation


