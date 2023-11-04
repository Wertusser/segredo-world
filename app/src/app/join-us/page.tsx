"use client";

import { Header } from "@/components/header";
import { SiteLayout } from "@/components/layout";
import { TREE } from "@/constants/arts";
import { tweenText } from "@/lib/utils/tween-text";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { styled } from "styled-components";
import { useEthPrice } from "@/lib/hooks/use-eth-price";
import { Tooltip as ReactTooltip } from "react-tooltip";

const GasIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.3078 0.278393C15.7064 -0.103884 16.3395 -0.0906517 16.7217 0.307949L20.9689 4.73645C21.2428 4.97487 21.4729 5.26217 21.6459 5.58477C21.8481 5.93184 22 6.34831 22 6.8271V17.2013C22 18.7486 20.7455 20.0001 19.2 20.0001C17.6536 20.0001 16.4 18.7465 16.4 17.2001V14.9C16.4 14.3477 15.9523 13.9 15.4 13.9H15V21.0001C15 21.0691 14.9965 21.1374 14.9897 21.2046C14.9515 21.5802 14.8095 21.925 14.5927 22.2099C14.2274 22.6901 13.6499 23.0001 13 23.0001H5C4.30964 23.0001 3.70098 22.6503 3.34157 22.1183C3.12592 21.7991 3.00001 21.4143 3 21.0001V4.00003C3 2.34317 4.34315 1.00003 6 1.00003H12C13.6569 1.00003 15 2.34317 15 4.00003V11.9H15.4C17.0569 11.9 18.4 13.2432 18.4 14.9V17.2001C18.4 17.642 18.7582 18.0001 19.2 18.0001C19.6427 18.0001 20 17.6423 20 17.2013V9.82932C19.6872 9.93987 19.3506 10 19 10C17.3431 10 16 8.65688 16 7.00003C16 5.78863 16.718 4.74494 17.7517 4.27129L15.2783 1.6923C14.896 1.2937 14.9092 0.660671 15.3078 0.278393ZM19.6098 6.20743C19.441 6.07738 19.2296 6.00003 19 6.00003C18.4477 6.00003 18 6.44774 18 7.00003C18 7.55231 18.4477 8.00003 19 8.00003C19.5523 8.00003 20 7.55231 20 7.00003C20 6.84096 19.9629 6.69057 19.8968 6.55705C19.8303 6.45176 19.7349 6.33571 19.6098 6.20743ZM5 11C5 10.4477 5.44772 10 6 10H9H12C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12H6C5.44772 12 5 11.5523 5 11ZM5 15C5 14.4477 5.44772 14 6 14H12C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16H6C5.44772 16 5 15.5523 5 15ZM6 18C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H12C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18H6Z"
        fill="gray"
      ></path>
    </svg>
  );
};

const EthIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="24"
      height="24"
      viewBox="0 0 32 32"
    >
      <path
        fill="white"
        d="M15.927 23.959l-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0l-9.819 16.297 9.819 5.807 9.823-5.801z"
      />
    </svg>
  );
};

export default function Join() {
  const [ethValue, setEthValue] = useState(0.01);
  const [key, setKey] = useState(() => new Array(64).fill("#").join(""));
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { price } = useEthPrice();

  const onChange = (event: any) => {
    setEthValue(event.floatValue);
  };

  const onJoin = async () => {
    await tweenText(
      key,
      "0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001",
      setKey
    );
    setStatus("success");
  };

  return (
    <>
      <Header />
      <SiteLayout>
        <Centered>
          <TreeQuote
            $isSuccess={status === "success"}
          >{`"All information looks like noise until you break the code."`}</TreeQuote>
          <TreeText $isSuccess={status === "success"}>{TREE}</TreeText>

          <FormLayout>
            <FormLayer>
              <KeyText>Key: {key}</KeyText>
              {status === "success" ? <TextButton>Copy</TextButton> : null}
              <TextButton data-tooltip-id="help-tooltip">?</TextButton>
            </FormLayer>
            <FormLayer>
              <IconLayout>
                <EthIcon />
                <NumericFormat
                  placeholder="0.1"
                  customInput={FormInput}
                  value={ethValue}
                  min={0.01}
                  onValueChange={onChange}
                />
              </IconLayout>
              <FormButton onClick={onJoin}>
                <code>Join</code>
              </FormButton>
            </FormLayer>
            <FormLayer>
              <code>
                {price ? `$${(price * (ethValue || 0)).toFixed(2)}` : `...`}
              </code>
              <IconLayout>
                <GasIcon />
                <code>1.5$</code>
              </IconLayout>
            </FormLayer>
          </FormLayout>
          <JoinDescription></JoinDescription>
        </Centered>
        <ReactTooltip id="help-tooltip" place="left" style={{ width: "300px" }}>
          <code>
            In order to submit solutions, you need to become a member of{" "}
            <SocietyText>the Society </SocietyText> and purchase a key, which
            will be used as proof of identity. The key is linked to your address
            and if you lose it, you will not be able to prove your membership.
            <br />
            <br />
            Min. value to join - 0.01 ETH, if you pay more -{" "}
            <SocietyText>the Society</SocietyText> will never forget you.
          </code>
        </ReactTooltip>
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
  transition: all 1s ease;
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: max-content;
  height: max-content;
  border: 1px solid gray;
  border-radius: 16px;
  padding: 16px;
  order: 2;

  @media (max-width: 426px) {
    width: 100%;
  }
`;

const FormLayer = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  justify-content: space-between;
  gap: 12px;
`;

const IconLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: gray;
`;

const TreeText = styled.pre<{ $isSuccess: boolean }>`
  font-size: 4px;
  font-weight: 700;
  line-height: ${(props) => (props.$isSuccess ? "6px" : "0px")};
  color: ${(props) => (props.$isSuccess ? "white" : "black")};
  order: ${(props) => (props.$isSuccess ? "1" : "3")};
  transition: color 1.5s ease, line-height 0.2s linear;

  margin: 32px 0;

  @media (max-width: 426px) {
    font-size: 2px;
    line-height: ${(props) => (props.$isSuccess ? "3px" : "0px")};
  }
`;

const TreeQuote = styled.code<{ $isSuccess: boolean }>`
  color: ${(props) => (props.$isSuccess ? "white" : "black")};
  order: ${(props) => (props.$isSuccess ? "1" : "3")};
`;

const FormInput = styled.input`
  color: white;
  background: transparent;
  width: 100%;
  height: 2em;
  font-size: 1.5em;
  overflow-y: hidden;
  resize: none;
  border: none;
  outline: none;
`;

const FormButton = styled.button`
  width: max-content;
  padding: 6px;

  background: transparent;
  border: 1px solid gray;
  border-radius: 6px;
  transition: all 0.2s ease-in;
  color: white;

  &:hover {
    border-color: white;
  }

  &:active {
    background: #121212;
  }
`;

const JoinDescription = styled.code`
  margin-bottom: 16px;
  color: gray;
  /* order: 2; */
`;

const KeyText = styled.code`
  width: 70vw;
  min-width: 200px;
  max-width: 550px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
`;

const TextButton = styled.code`
  text-decoration: underline;
  cursor: pointer;
`;

const SocietyText = styled.span`
  color: #1aa7ec;
`;
