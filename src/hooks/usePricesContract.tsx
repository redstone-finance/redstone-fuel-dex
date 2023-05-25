import { Dispatch, SetStateAction, useState } from "react";
import { ChainDetails } from "../config/chains";
import { ContractParamsProvider, IContractConnector } from "redstone-sdk";
import { IDexContractAdapter } from "./IDexContractAdapter";

const DATA_SERVICE_URL = "https://d33trozg86ya9x.cloudfront.net";
const dataPackageRequestParams = {
  dataServiceId: "redstone-rapid-demo",
  uniqueSignersCount: 1,
  dataFeeds: ["BTC", "ETH", "BNB", "AR", "AVAX", "CELO"],
};

export const usePricesContract = (
  network: ChainDetails | null,
  connector: IContractConnector<IDexContractAdapter>,
  startMockLoader: () => void,
  setIsMockLoading: Dispatch<SetStateAction<boolean>>,
  paramsProviderClass: typeof ContractParamsProvider = ContractParamsProvider
) => {
  const [blockNumber] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [timestamp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const paramsProvider = new paramsProviderClass(dataPackageRequestParams, [
    DATA_SERVICE_URL,
  ]);

  const changeEthToUsd = async () => {
    await performContractAction(async (adapter: IDexContractAdapter) => {
      const txHashOrPrices = await adapter.changeEthToUsd(
        paramsProvider,
        0.001
      );

      setTxHash(txHashOrPrices);
    });
  };

  const withdrawFunds = async () => {
    await performContractAction(async (adapter: IDexContractAdapter) => {
      const txHashOrPrices = await adapter.withdrawFunds();

      setTxHash(txHashOrPrices);
    });
  };

  const performContractAction = async (
    callback: (adapter: IDexContractAdapter) => void
  ) => {
    if (network) {
      try {
        startMockLoader();
        setIsLoading(true);

        const adapter = await connector.getAdapter();

        if (adapter) {
          await callback(adapter);
          setIsMockLoading(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        handleError();
        setIsMockLoading(false);
        setIsLoading(false);
      }
    } else {
      handleError();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setIsMockLoading(false);
    setErrorMessage(
      "There was problem with fetching data from smart adapter. Please try again or contact RedStone team"
    );
  };

  return {
    blockNumber,
    txHash,
    timestamp,
    isLoading,
    errorMessage,
    setErrorMessage,
    changeEthToUsd,
    withdrawFunds,
  };
};
