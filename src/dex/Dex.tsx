// @ts-ignore
import FuelLogo from "../assets/fuel.svg";
import { useFuel } from "../hooks/useFuel";
import { DexBlock } from "./DexBlock";
import { FuelBlock } from "../hooks/FuelBlock";
import { DexContractConnector } from "./DexContractConnector";
import { FUEL_DEX_CONTRACT_ID, FUEL_TOKEN_ID } from "../config/constants";

export const Dex = () => {
  const fuel = useFuel();

  const onChainClick = async () => {
    return await fuel.connectWallet();
  };

  const connector = new DexContractConnector(
    fuel.wallet!,
    FUEL_DEX_CONTRACT_ID,
    FUEL_TOKEN_ID
  );

  return (
    <div className="flex justify-center items-center flex-col">
      {!fuel.wallet ? (
        <FuelBlock
          props={{
            onPrivateKeyChange: fuel.usePrivateKey,
            onChainClick,
            wallet: fuel.wallet,
          }}
        />
      ) : (
        <DexBlock
          props={{
            wallet: fuel.wallet,
            walletAddress: fuel.walletAddress,
            adapterPromise: connector.getAdapter(),
          }}
        />
      )}
    </div>
  );
};
