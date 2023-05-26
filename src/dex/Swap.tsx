import { useEffect, useRef, useState } from "react";
import { AmountInput } from "../components/AmountInput";
import EthIcon from "../assets/eth.svg";
import RedstoneIcon from "../assets/redstone-icon.svg";
import ArrowDownward from "../assets/arrow-downward.svg";

interface Props {
  props: {
    priceCallback: () => Promise<number>;
    ethAmountChanged: (ethAmount: number) => void;
  };
}

export function Swap({ props }: Props) {
  const { priceCallback, ethAmountChanged } = props;

  let [ethAmount, setEthAmount] = useState(0);
  let [tokenAmount, setTokenAmount] = useState(0);

  const changer = useRef(0);

  useEffect(() => {
    ethAmountChanged(ethAmount);
    console.log(`E ${changer.current} ${ethAmount}`);
    if (changer.current >= 1) {
      return;
    }
    changer.current = 1;
  }, [ethAmount]);

  useEffect(() => {
    console.log(`T ${changer.current} ${tokenAmount}`);
    if (changer.current >= 1) {
      return;
    }
    changer.current = 2;
  }, [tokenAmount]);

  useEffect(() => {
    async function calculateTokenAmount() {
      console.log(`X ${changer.current}`);
      if (changer.current != 1) {
        return;
      }

      let price = await priceCallback();

      setTokenAmount(ethAmount * price);
      changer.current = Math.random();
    }

    async function calculateEthAmount() {
      console.log(`Y ${changer.current}`);
      if (changer.current != 2) {
        return;
      }

      let price = await priceCallback();

      setEthAmount(tokenAmount / price);
      changer.current = Math.random();
    }

    console.log(`A ${changer.current}`);
    calculateTokenAmount();
    calculateEthAmount();
  }, [changer.current]);

  return (
    <div className="flex justify-center items-center flex-col mb-4">
      <AmountInput
        icon={EthIcon}
        amount={ethAmount}
        onInput={setEthAmount}
        className=""
      />
      <img
        src={ArrowDownward}
        className="w-8 h-8 rounded bg-gray-200 relative bottom-2 border-redstone ring-gray-200 ring-1 z-10"
        alt="Arrow"
      />
      <AmountInput
        className="relative bottom-4"
        icon={RedstoneIcon}
        amount={tokenAmount}
        onInput={setTokenAmount}
      />
    </div>
  );
}
