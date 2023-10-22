"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { styled } from "styled-components";

const HEADER_LINKS = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Chat", link: "/chat" },
  { title: "Join Us", link: "/join-us" },
];

export const Header = () => {
  const headerLinks = HEADER_LINKS.map((item, i) => {
    return (
      <HeaderLink key={i}>
        <Link href={item.link}>{item.title}</Link>
      </HeaderLink>
    );
  });
  return (
    <HeaderLayout>
      <HeaderLogo>LOGO</HeaderLogo>
      <HeaderLinks>{headerLinks}</HeaderLinks>

      <HeaderConnectButton>
        <ConnectButton
          label="Connect"
          showBalance={false}
          accountStatus={"address"}
          chainStatus={"none"}
        />
      </HeaderConnectButton>
    </HeaderLayout>
  );
};

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 42px auto;
  width: calc(100% - 32px);
  max-width: 1440px;

  @media (max-width: 426px) {
    flex-wrap: wrap;
    margin: 42px 16px;
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5pc;
  width: 70%;

  @media (max-width: 426px) {
    width: 100%;
    order: 3;
    margin-top: 16px;
    justify-content: space-between;
    gap: 0;
  }
`;

const HeaderLink = styled.div``;

const HeaderLogo = styled.div`
  width: 25%;

  @media (max-width: 426px) {
    width: 50%;
  }
`;
const HeaderConnectButton = styled.div`
  display: flex;
  justify-content: flex-end;
  
  width: 25%;
  
  @media (max-width: 426px) {
    width: max-content;
  }
`;
