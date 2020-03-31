# Turnip Tracker

## Goals

### Todo
- Authenticate with auth0 (see https://github.com/taddison/turnip-tracker.git)
- Store data in fauna (price, transactions)
- Each user only sees their own turnips

## Building

### Database Setup

- Create a database on fauna (https://dashboard.fauna.com/)
- Import the graphql schema file `schema.gql`
- Create a new role (security -> manage roles), grant CRUD on all three collections (Transaction, User, PriceEntry)
- Create a new key in the role
- Place this key in a `.env.local` file, with the name `FAUNA_SECRET`.  See `.env.sample` for an example.

### Running the app

- Clone the repo
- `yarn dev`

## Refs
- Secrets in local development: https://zeit.co/docs/v2/serverless-functions/env-and-secrets/#during-local-development
  - In the future -> https://zeit.co/docs/v2/serverless-functions/env-and-secrets/#adding-secrets