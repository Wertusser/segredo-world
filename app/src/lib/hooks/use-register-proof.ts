import { useEffect, useMemo, useState } from "react";
import registerCode from "../../fixtures/register.zok";
import { useZkProof } from "./use-zk-proof";
import { jubjub } from "@noble/curves/jubjub";
import { bytesToNumberBE } from "@noble/curves/abstract/utils";

export const useRegisterProof = () => {
  const { generateProof } = useZkProof(registerCode as string);
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
