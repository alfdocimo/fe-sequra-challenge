import { apiClient } from "@/shared/api/api-client";
import { InstalmentPlans } from "@/entities/credit-agreements/model";

export const creditAgreementsApi = {
  get: ({ totalWithTax }: { totalWithTax: number }) => {
    return apiClient.get<InstalmentPlans>(
      `/credit_agreements?totalWithTax=${totalWithTax}`
    );
  },
};
