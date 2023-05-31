// @ts-ignore
import FuelLogo from "../assets/fuel.svg";
import { FUEL_NETWORK_NAME } from "../config/constants";
import { useFuel } from "../hooks/useFuel";
import { DexBlock } from "./DexBlock";
import { useState } from "react";

export const Dex = () => {
  const [isSelected, select] = useState(false);

  const fuel = useFuel();

  const onChainClick = async () => {
    select(true);

    return await fuel.connectWallet();
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {!isSelected && (
        <p className="mb-10 text-lg font-bold">
          Please select the chain-button to integrate your wallet:
        </p>
      )}
      <button
        className={`flex align-center gap-2 border py-2 px-2 rounded ${
          isSelected && "border-redstone"
        } disabled:opacity-30 hover:scale-110	ease-in-out duration-300`}
        onClick={onChainClick}
        disabled={false}
      >
        <img
          style={{ height: 24, width: 24 }}
          src={FuelLogo}
          alt={`${FUEL_NETWORK_NAME} logo`}
        />
        {"Fuel"}
      </button>

      <DexBlock props={{ ...fuel, isSelected }} />
    </div>
  );
};
