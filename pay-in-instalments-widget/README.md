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

## Build our solution for merchant websites

```sh
pnpm run build
```

This will generate our .js and .css files inside of `/dist`

## Structure

The following repo uses an ad-hoc version of [Feature Slice Design](https://feature-sliced.design/)

As we are not using `pages` but rather working inside of `widget` when creating new functionalities

### Directories

- e2e:
  - This is where we test the core logic of our widget. It should mount in a browser by instantiating the widget
- public:
  - public files like images, and our worker for tests
- src:
  - entities:
    - credit-agreements: The model, and api client of our interaction with /credit_agreement API.
    - events: The model, and api client of our interaction with /events API.
  - shared:
    - api: agnostic api-client
    - components: reused and agnostic components (not related with business logic)
    - utils: utility functions and classes
  - tests: setup for our unit and integration tests
  - widget: core logic for our widget
    - index: Class that exposes the widget instance
    - event-bus: Our EventBus class with all our events
    - test: Integration tests for the widget
    - ui:
      - components: components that are bound to our business logic
      - context: react context that updates our UI and keeps the widget subscribed to events from the `EventBus`
