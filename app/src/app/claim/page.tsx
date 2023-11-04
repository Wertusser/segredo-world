"use client";

import { Header } from "@/components/header";
import { SiteLayout } from "@/components/layout";
import { TREE } from "@/constants/arts";

import { useState } from "react";
import { styled } from "styled-components";

const SendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 100 125"
      x="0px"
      y="0px"
    >
      <path
        style={{ fill: "inherit" }}
        d="M62.55,42.44a1.45,1.45,0,0,0-2.08-2l-26,22.12L20.74,57.25a3.34,3.34,0,0,1-.39-6.06l57-31.93A2.81,2.81,0,0,1,81.48,22l-5,52.12A3.45,3.45,0,0,1,71.76,77L55.05,70.53,44.56,80.36a2.71,2.71,0,0,1-4.56-2V70.64Z"
      />
    </svg>
  );
};

export default function Claim() {
  const [value, setValue] = useState("");

  const onKeyDown = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
      <Header />
      <SiteLayout>
        <Centered>
          <TreeText>{TREE}</TreeText>
          <FormLayout>
            <FormInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Tell Us The Truth.."
            />
            <FormButton
              type="button"
              onClick={() => []}
              disabled={value.length === 0}
            >
              <SendIcon />
            </FormButton>
          </FormLayout>
        </Centered>
      </SiteLayout>
    </>
  );
}

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const FormLayout = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  border: 1px solid gray;
  border-radius: 16px;
  padding: 16px;
`;

const TreeText = styled.pre`
  font-size: 4px;
  line-height: 6px;
  font-weight: 700;
  color: white;
  transition: color 1s ease;

  margin: 32px 0;

  @media (max-width: 426px) {
    font-size: 2px;
    line-height: 3px;
  }
`;

const FormInput = styled.textarea`
  color: white;
  background: transparent;
  width: 100%;
  overflow-y: hidden;
  resize: none;
  border: none;
  outline: none;
`;

const FormButton = styled.button`
  width: 2em;
  height: 2em;

  background: transparent;
  border: none;
  transition: color 0.2s ease-in;

  & svg {
    fill: white;
    transition: fill 0.2s ease-in;
  }

  &:disabled svg {
    fill: gray;
  }
`;
