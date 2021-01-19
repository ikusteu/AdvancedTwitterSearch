# Advenced Twitter Search

## About

This is an API integration parctice project, the idea is to make an app which provides some search filters and fetches tweets using Twitter API v2. Filter options are:

- tweets that contain a given hashtag
- tweets that contain given text
- tweets posted by given username
- tweets liked by given username
  \*last two are mutually exclusive

## Running scripts

### `yarn start`

Starts both dev server for frontend and proxy server, both in separate terminal windows

### `yarn dev`

Starts dev server for app frontent on `localhost:3000`

### `yarn server`

Starts proxy server on `localhost:4000`

_-please note: while proxy server is standalone and running it on it's own allows for testing using curl or Postman, the app is not standalone and running just a dev server with `yarn dev` will provide preview for apps UI, but the functionality will not work since it uses the proxy server for all requests_

## Folder structure

`src` folder contains the main app written in `.ts` and `.tsx` with subfolders:

- `components` - contains all React components both styled and logic
- `app` - contains client definition for Apollo Client
- `api` - contains `.graphql` queries
- `lib` - contains helper functions and types

`proxy` contains only onde file: `src/index.ts` which is a basic proxy server used to override browsers CORS policy and allow for API calls to Twitter(which for some reason doesn't have CORS policy).

## Data flow and caching

User provides input in the UI through the filter form, the input data is then processed to make a call to the Twitter API using Apollo Client's `apollo-link-rest`. Since browsers have strict CORS policy, and Twitter doesn't respond with CORS headers, the call is first made to `localhost:4000` proxy server which then parses the same request to Twitter API and returns the response to our client with basic CORS headers. The data is then cached by Apollo Client's `InMemoryCache` and rendered to the UI. All subsequent requests are first made locally to the cache and only when the cache is exhausted is the request is sent to the API (to reduce redundant API calls and optimize the network load).

## State management

State management is done by using local state and Apollo's `InMemoryCache` since there is not much state shared between components other than fetched data which Apollo Client automatically caches. This is also the reason why Apollo Client was used for `REST` calls instead of some lighter library such as `axios`.

## UI

UI is made using `styed-components` due to simplicity of the app.
