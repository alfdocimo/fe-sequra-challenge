import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { EventBus } from "@/widget/event-bus/index";
import { EventBusProvider } from "@/widget/ui/context/event-bus-context";
import { Widget } from "@/widget/ui/index";
import { InstalmentPlansByPriceProvider } from "@/widget/ui/context/instalment-plans-by-price-context";
import { PriceProvider } from "@/widget/ui/context/price-context";
import { SelectedInstalmentPlanProvider } from "@/widget/ui/context/selected-instalment-plan-context";
import userEvent from "@testing-library/user-event";
import { server } from "@/tests/mocks/worker";
import { http, HttpResponse } from "msw";

const eventBus = new EventBus();

describe("Widget UI", () => {
  it("Should display initial instalment options and be able to select one", async () => {
    render(
      <EventBusProvider eventBusClient={eventBus}>
        <SelectedInstalmentPlanProvider>
          <PriceProvider price={1000}>
            <InstalmentPlansByPriceProvider>
              <Widget />
            </InstalmentPlansByPriceProvider>
          </PriceProvider>
        </SelectedInstalmentPlanProvider>
      </EventBusProvider>
    );

    const options = await screen.findByTestId("instalment-option-default");
    userEvent.click(options);

    const threeMonthsInstalment = await screen.findByText(
      /3 cuotas de 38,33 €\/mes/i
    );
    userEvent.click(threeMonthsInstalment);

    await waitFor(() =>
      expect(
        screen.getByTestId("instalment-option-selected-item")
      ).toHaveTextContent("3 cuotas de 38,33 €/mes")
    );
  });

  it("Should display initial instalment options and update prices when event [price.update] is emitted and price changes from [10000] to [80000]", async () => {
    server.use(
      http.get(
        "http://localhost:8080/credit_agreements?totalWithTax=*",
        () => {
          return HttpResponse.json([
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
          ]);
        },
        { once: true }
      ),
      http.get("http://localhost:8080/credit_agreements?totalWithTax=*", () => {
        return HttpResponse.json([
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
        ]);
      })
    );

    render(
      <EventBusProvider eventBusClient={eventBus}>
        <SelectedInstalmentPlanProvider>
          <PriceProvider price={1000}>
            <InstalmentPlansByPriceProvider>
              <Widget />
            </InstalmentPlansByPriceProvider>
          </PriceProvider>
        </SelectedInstalmentPlanProvider>
      </EventBusProvider>
    );

    const options = await screen.findByTestId("instalment-option-default");
    userEvent.click(options);

    const threeMonthsInstalment = await screen.findByText(
      /3 cuotas de 38,33 €\/mes/i
    );
    userEvent.click(threeMonthsInstalment);

    await waitFor(() =>
      expect(
        screen.getByTestId("instalment-option-selected-item")
      ).toHaveTextContent("3 cuotas de 38,33 €/mes")
    );

    eventBus.emit("price.update", { amount: 80000 });

    userEvent.click(options);

    const updatedThreeMonthsInstalment = await screen.findByText(
      /3 cuotas de 274,16 €\/mes/
    );

    expect(updatedThreeMonthsInstalment).toBeInTheDocument();
  });
});
