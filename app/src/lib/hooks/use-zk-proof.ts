import { useCallback } from "react";
import { useZokrates } from "./use-zokrates";

export const useZkProof = (zokratesSource: string) => {
  const { isLoading, provider } = useZokrates();

  const generateProof = useCallback(
    (args: any[]) => {
      if (!provider) return;

      const artifacts = provider.compile(zokratesSource);
      const { witness } = provider.computeWitness(artifacts, args);
      const keypair = provider.setup(artifacts.program);
      return provider.generateProof(
        artifacts.program,
        witness,
        keypair.pk
      );
    },
    [provider, zokratesSource]
  );

  return {
    isLoading,
    generateProof,
    provider,
  };
};
