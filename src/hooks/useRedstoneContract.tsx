import { Dispatch, SetStateAction, useState } from "react";
import { IContractConnector } from "redstone-sdk";
import { IDexContractAdapter } from "./IDexContractAdapter";


export const useRedstoneContract = (
  connector: IContractConnector<IDexContractAdapter>,
  startMockLoader: () => void,
  setIsMockLoading: Dispatch<SetStateAction<boolean>>,
) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const performContractAction = async (
    callback: (adapter: IDexContractAdapter) => void
  ) => {
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
  };

  const handleError = () => {
    setIsLoading(false);
    setIsMockLoading(false);
    setErrorMessage(
      "There was problem with fetching data from smart adapter. Please try again or contact RedStone team"
    );
  };

  return {
    isLoading,
    errorMessage,
    setErrorMessage,
    performContractAction
  };
};
