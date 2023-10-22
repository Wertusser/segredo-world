"use client";

import localFont from "next/font/local";
import StyledComponentsRegistry from "@/lib/registry";

import {
  darkTheme,
  midnightTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const font = localFont({ src: "../../public/matisse-pro-eb.woff2" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chains, publicClient } = configureChains(
    [optimism],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "RainbowKit App",
    projectId: "IASDASD",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <html lang="en">
      <body className={font.className}>
        <StyledComponentsRegistry>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              theme={midnightTheme({
                overlayBlur: "small",
              })}
              modalSize={"compact"}
              chains={chains}
            >
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
