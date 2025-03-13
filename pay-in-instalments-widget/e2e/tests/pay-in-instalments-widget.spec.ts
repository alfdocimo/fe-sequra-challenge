import { test, expect } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  // Ideally we would use msw for mock/stubbing both local development and e2e and component testing
  await context.route(
    "http://localhost:8080/credit_agreements?totalWithTax=*",
    (route) => {
      const url = new URL(route.request().url());
      const queryParam = url.searchParams.get("totalWithTax");

      let responseBody;
      if (Number(queryParam) <= 10000) {
        responseBody = {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
          body: JSON.stringify([
            {
              instalment_count: 3,
              total_with_tax: { value: 10000, string: "100 €" },
              instalment_amount: { value: 3333, string: "33,33 €" },
              instalment_fee: { value: 500, string: "5 €" },
              instalment_total: { value: 3833, string: "38,33 €" },
              grand_total: { value: 11500, string: "115 €" },
              cost_of_credit: { value: 1500, string: "15 €" },
              cost_of_credit_pct: { value: 600, string: "6,00 %" },
              apr: { value: 2500, string: "25 %" },
              max_financed_amount: { value: 200000, string: "2000 €" },
            },
            {
              instalment_count: 6,
              total_with_tax: { value: 10000, string: "100 €" },
              instalment_amount: { value: 1666, string: "16,66 €" },
              instalment_fee: { value: 500, string: "5 €" },
              instalment_total: { value: 2166, string: "21,66 €" },
              grand_total: { value: 13000, string: "130 €" },
              cost_of_credit: { value: 3000, string: "30 €" },
              cost_of_credit_pct: { value: 600, string: "6,00 %" },
              apr: { value: 2500, string: "25 %" },
              max_financed_amount: { value: 200000, string: "2000 €" },
            },
          ]),
        };
      }

      if (Number(queryParam) === 80000) {
        responseBody = {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
          body: JSON.stringify([
            {
              instalment_count: 3,
              total_with_tax: {
                value: 80000,
                string: "800 €",
              },
              instalment_amount: {
                value: 26666,
                string: "266,66 €",
              },
              instalment_fee: {
                value: 750,
                string: "7,5 €",
              },
              instalment_total: {
                value: 27416,
                string: "274,16 €",
              },
              grand_total: {
                value: 82250,
                string: "822,5 €",
              },
              cost_of_credit: {
                value: 2250,
                string: "22,5 €",
              },
              cost_of_credit_pct: {
                value: 600,
                string: "6,00 %",
              },
              apr: {
                value: 2500,
                string: "25 %",
              },
              max_financed_amount: {
                value: 200000,
                string: "2000 €",
              },
            },
            {
              instalment_count: 6,
              total_with_tax: {
                value: 80000,
                string: "800 €",
              },
              instalment_amount: {
                value: 13333,
                string: "133,33 €",
              },
              instalment_fee: {
                value: 750,
                string: "7,5 €",
              },
              instalment_total: {
                value: 14083,
                string: "140,83 €",
              },
              grand_total: {
                value: 84500,
                string: "845 €",
              },
              cost_of_credit: {
                value: 4500,
                string: "45 €",
              },
              cost_of_credit_pct: {
                value: 600,
                string: "6,00 %",
              },
              apr: {
                value: 2500,
                string: "25 %",
              },
              max_financed_amount: {
                value: 200000,
                string: "2000 €",
              },
            },
          ]),
        };
      }
      route.fulfill(responseBody);
    }
  );

  await context.route("http://localhost:8080/events", (route) =>
    route.fulfill({
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
      body: "",
    })
  );
});

test("Its able to select an instalment option", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const defaultSelectedOptionText = await page.locator(
    ".pay-in-instalments-widget__listbox__selected-item"
  );
  expect(defaultSelectedOptionText).toHaveText("Selecciona una opcion");

  const toggleSelectOptionsButton = await page.locator(
    ".pay-in-instalments-widget__listbox__toggle-button"
  );
  toggleSelectOptionsButton.click();

  await page
    .locator(".pay-in-instalments-widget__listbox__content")
    .waitFor({ state: "visible" });

  const threeMonthsInstalmentOption = await page.locator(
    ".pay-in-instalments-widget__listbox__content > div:nth-child(1) > div"
  );
  threeMonthsInstalmentOption.click();

  await page
    .locator(".pay-in-instalments-widget__listbox__content")
    .waitFor({ state: "hidden" });

  expect(
    await page.locator(".pay-in-instalments-widget__listbox__selected-item")
  ).toHaveText("3 cuotas de 38,33 €/mes");
});

test("Its able to update price when merchant emits events", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  const defaultSelectedOptionText = await page.locator(
    ".pay-in-instalments-widget__listbox__selected-item"
  );
  expect(defaultSelectedOptionText).toHaveText("Selecciona una opcion");

  const toggleSelectOptionsButton = await page.locator(
    ".pay-in-instalments-widget__listbox__toggle-button"
  );
  toggleSelectOptionsButton.click();

  await page
    .locator(".pay-in-instalments-widget__listbox__content")
    .waitFor({ state: "visible" });

  const threeMonthsInstalmentOption = await page.locator(
    ".pay-in-instalments-widget__listbox__content > div:nth-child(1) > div"
  );
  expect(threeMonthsInstalmentOption).toHaveText("3 cuotas de 38,33 €/mes");

  const updatePriceBtn = await page.getByRole("button", {
    name: "Update price to 80000 €",
  });
  updatePriceBtn.click();

  await page.waitForRequest(
    "http://localhost:8080/credit_agreements?totalWithTax=*"
  );

  toggleSelectOptionsButton.click();

  await page
    .locator(".pay-in-instalments-widget__listbox__content")
    .waitFor({ state: "visible" });

  const updatedThreeMonthsInstalmentOption = await page.locator(
    ".pay-in-instalments-widget__listbox__content > div:nth-child(1) > div"
  );

  expect(updatedThreeMonthsInstalmentOption).toHaveText(
    "3 cuotas de 274,16 €/mes"
  );
});
