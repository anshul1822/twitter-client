Login Page
![image](https://github.com/anshul1822/twitter-client/assets/68806086/2dd4d58f-3046-4872-a3b3-ff4256993d19)


<!-- Headings -->
<!-- Installations should be either at the start or the end -->

# Twitter Clone - Typescript | NodeJS | GraphQL | PostgreSQL | AWS

Recreated important functions of Twitter using Typescript as the primary frontend language and NodeJS for backend. Easy to scale and upgradable on demand. Used Redis to cache data such that subsequent requests get faster response as the scale grows.

For the _frontend_ I used **NextJS** for server side rendering, **Tailwind CSS** for styling, **GraphQL** queries/mutations, and hosted on **Vercel**.

For the _backend_ I used **Apollo server** for the **GraphQl API**, **PostgreSQL** for the database, **Supabase** for hosting. This is hosted on **AWS EC2** Machine. The backend server is **SSL certified** 
<!--  with **NGINX proxy**. -->

For _storage and hosting_, I used **Amazon S3** and **AWS EC2**. **Google OAuth** and **JSON web tokens** were used for authentication.

installation guide will be at the end

## Short Description

Twitter clone is an web application with similar functionalities as the popular social media platform twitter.
This project is constantly being developed with new functionalities. This readme is for describing it's architecture flow and data modelling

## Architecture

![project_architecture](https://github.com/anshul1822/twitter-client/assets/68806086/b4df6d67-8e35-44bc-9d57-ccd4d1afeafa)



### Steps : 

1. Front end loads the page by fetching tweets from backend hosted on AWS EC2.
2. User authentication flow.
3. If Tweets are already available on Redis it directly fetches from there.
4. If not we'll fetch it from database through Apollo server with graphql requests.
5. Postgresql is our db.
6. Media content is stored on AWS S3.

## Data Model

![Data_Model](https://github.com/anshul1822/twitter-client/assets/68806086/fd37aa5c-e80f-47f1-b804-ce9527fe0009)



### Steps :

1. Currently there are 3 models User, Tweet and Follows.
2. Each of them has their set of Atrributes which helps us understand their properties and relations.
3. All of these are being mapped using Prisma ORM.
4. Postgresql is our server for data storage of non media storage and S3 is our storage service for media storage
5. Postgresql is hosted on Supabse
6. Queries are being asked fetched through Apollo server which requests via graphql API model


## installation guide
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash![Data_Model](https://github.com/anshul1822/twitter-client/assets/68806086/a0cd3170-f45c-44f0-9853-c8d85cf8719b)

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Fonts.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
