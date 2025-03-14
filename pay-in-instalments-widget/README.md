# Pay in instalments widget

This project is a React-based widget that displays installment options for a given product on a merchant's website. The widget is designed to be easily embeddable on third-party sites and updates dynamically when the product price changes.

## Tech Stack

🔵 **Vite** – Provides out-of-the-box support for common web patterns/frameworks

🔵 **TypeScript** – TypeSafety enables us to build, refactor, and ship faster with fewer bugs.

🔵 **Playwright** – End-to-end testing

🔵 **Vitest** – Testing framework

🔵 **React Testing Library** – React Component testing

🔵 **JSDOM** – Simulated browser environment for tests

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

## Usage in 3rd party websites (Merchants)

To integrate the widget into a merchant site, add the bundled script to the target webpage, along with its styles:

```html
<link
  rel="stylesheet"
  href="/path-to-widget/pay-in-instalments-widget/dist/pay-in-instalments-widget.css"
/>
<script src="/path-to-widget/pay-in-instalments-widget/dist/pay-in-instalments-widget.js"></script>

<script>
  // 1. Wait until DOMContent is loaded
  document.addEventListener("DOMContentLoaded", function () {
    // 2. Create a Widget instance
    const payInInstalmentsWidget = new PayInInstalmentsWidget();
    window.payInInstalmentsWidget = payInInstalmentsWidget;

    // 3. Locate the element that will act as the wrapper upon which it will be mounted
    const $widgetContainer = document.getElementById(
      "pay-in-instalments-widget-container"
    );
    const initialPrice = 39900;

    // 4. Mount the widget
    payInInstalmentsWidget.mount($widgetContainer, initialPrice);
  });
</script>
```

## Structure

The following repo uses an ad-hoc version of [Feature Slice Design](https://feature-sliced.design/)

As we are not using `pages` but rather working inside of `widget` when creating new functionalities

### Directories

```
/ pay-in-instalments-widget
│── e2e/                         # End-to-end tests for core widget logic
│   └── tests/                   # Tests instantiating the widget in a browser
│
│── public/                      # Static public assets
│   └── worker/                  # Worker for testing
│
│── src/                         # Main source code
│   │── entities/                # Business logic entities
│   │   ├── credit-agreements/   # Model & API client for /credit_agreement
│   │   ├── events/              # Model & API client for /events
│   │
│   │── shared/                  # Reusable and agnostic utilities
│   │   ├── api/                 # Generic API client
│   │   ├── components/          # Reused, non-business-specific components
│   │   ├── utils/               # Utility functions and classes
│   │
│   │── tests/                   # Unit and integration test setup
│   │
│   │── widget/                  # Core widget logic
│   │   ├── index.ts             # Class exposing widget instance
│   │   ├── event-bus/           # EventBus implementation
│   │   ├── test/                # Integration tests for the widget
│   │   └── ui/                  # UI components and state management
│   │       ├── components/      # Components bound to business logic
│   │       ├── context/         # React context managing state & subscriptions
│
└── README.md                    # Project documentation
```
