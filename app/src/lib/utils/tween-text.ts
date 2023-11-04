import { padStart, range, zip } from "lodash";

const tween = (fromNum: number, toNum: number, step: number, maxStep = 100) => {
  return fromNum + (step / maxStep) * (toNum - fromNum);
};

const toCharCodes = (str: string): number[] => {
  return range(0, str.length).map((i) => str.charCodeAt(i));
};

const fromCharCodes = (codes: number[]): string => {
  return codes.map((i) => String.fromCharCode(i)).join("");
};

const interpolate = (fromNum: number, toNum: number, maxStep = 100) => {
  return range(0, maxStep + 1).map((i) => tween(fromNum, toNum, i, maxStep));
};

export const randChar = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return characters[Math.floor(Math.random() * characters.length)];
};

const padRandom = (str: string, len: number): string[] => {
  const steps: string[] = [];
  let acc = str;

  while (acc.length <= len) {
    steps.push(acc);

    if (Math.random() > 0.5) {
      acc = acc + randChar();
    } else {
      acc = randChar() + acc;
    }
  }
  return steps;
};

const removeRandom = (str: string, items: number): string[] => {
  const steps: string[] = [];
  let acc = str;

  range(0, items).forEach(() => {
    steps.push(acc);

    const index = Math.floor(Math.random() * acc.length);
    acc = [...acc].filter((_, i) => i !== index).join("");
  });

  return steps;
};

export const interpolateRandom = (
  str1: string,
  str2: string,
  maxStep = 100
): string[] => {
  let preprocess: string[] = [];

  if (str1.length < str2.length) {
    preprocess = padRandom(str1, str2.length);
  }

  if (str1.length > str2.length) {
    preprocess = removeRandom(str1, str1.length - str2.length);
  }

  const chars1 = toCharCodes(
    str1.length < str2.length ? preprocess[preprocess.length - 1] : str1
  );
  const chars2 = toCharCodes(str2);

  const interpolations = zip(chars1, chars2).map(([c1, c2]) =>
    interpolate(c1!, c2!, maxStep).map((i) => Math.round(i))
  );

  const steps = zip(...interpolations).map((item) =>
    fromCharCodes(item as number[])
  );

  return [str1, ...preprocess, ...steps, str2];
};

export const tweenText = (
  fromVal: string,
  toVal: string,
  setFn: (value: string) => void
): Promise<string> => {
  if (fromVal === toVal) Promise.resolve(toVal);

  const interpolation = interpolateRandom(fromVal, toVal, Math.round(1000 / 20));

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const val = interpolation.shift();
      if (val) {
        setFn(val);
      } else {
        clearInterval(interval);
        resolve(toVal);
      }
    }, 20);
  });
};

