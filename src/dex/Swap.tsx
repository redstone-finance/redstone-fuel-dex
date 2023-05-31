import { useEffect, useRef, useState } from "react";
import { AmountInput } from "../components/AmountInput";

//@ts-ignore
import EthIcon from "../assets/eth.svg";
//@ts-ignore
import UsdIcon from "../assets/dollar.svg";
//@ts-ignore
import ArrowDownward from "../assets/arrow-downward.svg";

interface Props {
  props: {
    priceCallback: () => Promise<number>;
    ethAmountChanged: (ethAmount: number) => void;
  };
}

const ETH_ID = 1;
const TOKEN_ID = 2;

export function Swap({ props }: Props) {
  const { priceCallback, ethAmountChanged } = props;

  let [ethAmount, setEthAmount] = useState(0);
  let [tokenAmount, setTokenAmount] = useState(0);

  const changer = useRef(0);

  function ethFocus() {
    changer.current = ETH_ID;
  }

  function tokenFocus() {
    changer.current = TOKEN_ID;
  }

  useEffect(() => {
    ethAmountChanged(ethAmount);
    if (Math.floor(changer.current) !== ETH_ID || isNaN(ethAmount)) {
      return;
    }

    changer.current = ETH_ID + ethAmount / 10 ** 9;
  }, [ethAmount]);

  useEffect(() => {
    if (Math.floor(changer.current) !== TOKEN_ID || isNaN(tokenAmount)) {
      return;
    }

    changer.current = TOKEN_ID + tokenAmount / 10 ** 9;
  }, [tokenAmount]);

  useEffect(() => {
    async function calculateAmount(callback: (price: number) => void) {
      let prevChanger = changer.current;
      let price = await priceCallback();
      if (changer.current !== prevChanger) {
        return;
      }

      callback(price);
    }

    async function calculateTokenAmount() {
      await calculateAmount((price) => setTokenAmount(ethAmount * price));
    }

    async function calculateEthAmount() {
      await calculateAmount((price) => setEthAmount(tokenAmount / price));
    }

    switch (Math.floor(changer.current)) {
      case ETH_ID:
        calculateTokenAmount();
        break;
      case TOKEN_ID:
        calculateEthAmount();
        break;
    }
  }, [changer.current]);

  return (
    <div className="flex justify-center items-center flex-col mb-4">
      <AmountInput
        icon={EthIcon}
        amount={ethAmount}
        onInput={setEthAmount}
        onFocus={ethFocus}
        className=""
      />
      <img
        src={ArrowDownward}
        className="w-8 h-8 rounded bg-gray-200 relative bottom-2 border-redstone ring-gray-200 ring-1 z-10"
        alt="Arrow"
      />
      <AmountInput
        className="relative bottom-4"
        icon={UsdIcon}
        amount={tokenAmount}
        onInput={setTokenAmount}
        onFocus={tokenFocus}
      />
    </div>
  );
}
