import { useEffect, useMemo, useState } from "react";
import revealCode from "../../fixtures/reveal.zok";
import { useZkProof } from "./use-zk-proof";
import { jubjub } from "@noble/curves/jubjub";
import { bytesToNumberBE } from "@noble/curves/abstract/utils";

export const useRevealProof = () => {
  const { generateProof } = useZkProof(revealCode as string);
  const [privKey, setPrivKey] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const privKey = jubjub.utils.randomPrivateKey();
    setPrivKey(privKey);
  }, []);

  const proof = useMemo(() => {
    if (!privKey) return;

    const publicKey = jubjub.getPublicKey(privKey);
    return generateProof([
      bytesToNumberBE(publicKey),
      bytesToNumberBE(privKey),
    ]);
  }, [privKey, generateProof]);

  console.log(proof);
  return {};
};
