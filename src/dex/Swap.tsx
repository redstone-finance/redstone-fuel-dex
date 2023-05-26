import { useEffect, useRef, useState } from "react";
import { formatAmount } from "../utils";

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
    <div className="flex justify-center items-center flex-col mb-8">
      <input
        type="text"
        value={formatAmount(ethAmount)}
        className="bg-redstone bg-opacity-60 hover:opacity-75 text-white py-3 px-8 rounded-full text-xl text-right"
        onInput={(e) => setEthAmount(e.target.value)}
      />
      <input
        type="text"
        value={formatAmount(tokenAmount)}
        className="bg-redstone bg-opacity-60 hover:opacity-75 text-white py-3 px-8 rounded-full text-xl  mt-4 text-right"
        onInput={(e) => setTokenAmount(e.target.value)}
      />
    </div>
  );
}
