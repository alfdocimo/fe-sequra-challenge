type MonetaryValue = {
  value: number;
  string: string;
};

export type InstalmentPlan = {
  instalment_count: number;
  total_with_tax: MonetaryValue;
  instalment_amount: MonetaryValue;
  instalment_fee: MonetaryValue;
  instalment_total: MonetaryValue;
  grand_total: MonetaryValue;
  cost_of_credit: MonetaryValue;
  cost_of_credit_pct: MonetaryValue;
  apr: MonetaryValue;
  max_financed_amount: MonetaryValue;
};

export type InstalmentPlans = InstalmentPlan[];
