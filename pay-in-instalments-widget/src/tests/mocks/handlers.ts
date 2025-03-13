import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:8080/credit_agreements?totalWithTax=*", () => {
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
  }),
  http.post("http://localhost:8080/events", () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
