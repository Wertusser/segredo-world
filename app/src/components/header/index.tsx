"use client";

import { LOGO } from "@/constants/arts";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { styled } from "styled-components";

const HEADER_LINKS = [
  { title: "Join", link: "/join-us" },
  { title: "Claim", link: "/claim" },
  { title: "Chat", link: "/chat" },
  { title: "About", link: "/" },
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
      <HeaderLogo>
        <LogoText>{LOGO}</LogoText>
      </HeaderLogo>
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
    gap: 16px;
    flex-wrap: wrap;
    margin: 16px 16px 42px 16px;
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
    justify-content: space-between;
    gap: 0;
  }
`;

const HeaderLink = styled.div`
  /* transform: scale(1, 1.18); */
  font-weight: 700;

  color: gray;

  &:hover {
    color: white;
  }
`;

const LogoText = styled.pre`
  font-size: 2px;
  line-height: 1.7px;
  font-weight: 700;

  @media (max-width: 426px) {
    font-size: 1px;
    line-height: 1px;
  }
`;

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
