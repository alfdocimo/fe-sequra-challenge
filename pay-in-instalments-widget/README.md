# Pay in instalments widget

The following project uses Vite + TS to bundle a widget for 3rd party merchants.

## Getting started

👉 Install the dependencies

```sh
pnpm i
```

👉 Initialize mock service worker in our `public` dir

```sh
npx msw init
```

👉 Starting the development server

```sh
pnpm run dev
```

👉 Running our e2e tests with `playwright`

```sh
pnpm run test:e2e
```

👉 Running our integration/unit tests with `vitest`

```sh
pnpm run test
```

## Structure

The following repo uses an ad-hoc version of [Feature Slice Design](https://feature-sliced.design/)

As we are not using `pages` but rather working inside of `widget` when creating new functionalities
