import { useEffect, useState } from "react";

export const useEthPrice = () => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => data.json())
      .then((priceInfo) => {
        setPrice(Number(priceInfo?.data?.amount || "1800"));
      });
  }, []);

  return { price, isLoading: price === null };
};
