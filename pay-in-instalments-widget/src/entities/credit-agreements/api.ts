import { apiClient } from "@/shared/api/api-client";
import { InstalmentPlans } from "@/entities/credit-agreements/model";

const COULD_NOT_GET_CREDIT_AGREEMENTS_ERROR = new Error(
  "Could not get the credit agreements"
);

export const creditAgreementsApi = {
  get: ({ totalWithTax }: { totalWithTax: number }) => {
    try {
      return apiClient.get<InstalmentPlans>(
        `/credit_agreements?totalWithTax=${totalWithTax}`
      );
    } catch {
      throw COULD_NOT_GET_CREDIT_AGREEMENTS_ERROR;
    }
  },
};
