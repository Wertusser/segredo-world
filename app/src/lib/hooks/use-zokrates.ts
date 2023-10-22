import { useEffect, useState } from "react";
import { ZoKratesProvider, initialize } from "zokrates-js";

export const useZokrates = () => {
  const [provider, setProvider] = useState<null | ZoKratesProvider>(null);

  useEffect(() => {
    initialize().then((zokratesProvider) => {
      setProvider(zokratesProvider);
    });
  }, [setProvider]);

  return {
    isLoading: !provider,
    provider,
  };
};
