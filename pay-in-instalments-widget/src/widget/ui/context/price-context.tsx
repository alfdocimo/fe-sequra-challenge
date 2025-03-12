import { createContext, ReactNode, useContext, useMemo } from "react";

type PriceContextType = {
  price: number;
};

const PriceContext = createContext<PriceContextType>(null);

export const PriceProvider = ({
  children,
  price,
}: {
  price: number;
  children: ReactNode;
}) => {
  return (
    <PriceContext.Provider value={useMemo(() => ({ price }), [price])}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => {
  const priceContext = useContext(PriceContext);

  if (!priceContext) {
    throw new Error("usePrice must be used within PriceProvider");
  }
  return priceContext as PriceContextType;
};
