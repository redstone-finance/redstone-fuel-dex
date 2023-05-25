import { ChainButton } from "../components/ChainButton";
import { ChainDetails, chains } from "../config/chains";
import { useFuel } from "../hooks/useFuel";
import { FuelBlock } from "./FuelBlock";
import { useState } from "react";

const chainsArray = Object.values(chains);

export const Showroom = () => {
  const [network, setNetwork] = useState<ChainDetails | null>(null);

  const fuel = useFuel();

  const onChainClick = async (chain: ChainDetails) => {
    setNetwork(chain);

    return await fuel.connectWallet();
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {!network && (
        <p className="mb-10 text-lg font-bold">
          Please select a chain-button to integrate your wallet:
        </p>
      )}
      <div className="w-3/5 flex flex-wrap justify-center gap-3 px-10">
        {chainsArray.map((ch) => (
          <ChainButton
            key={ch.chainId}
            chain={ch}
            network={network}
            onChainClick={onChainClick}
            disabled={false}
          />
        ))}
      </div>

      {network?.type === "fuel" && (
        <FuelBlock props={{ ...fuel }} network={network!} />
      )}
    </div>
  );
};