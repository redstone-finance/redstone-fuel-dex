import { Dispatch, SetStateAction, useState } from "react";

export const useLoaders = (
  startMockLoader: () => void,
  setIsMockLoading: Dispatch<SetStateAction<boolean>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const performAction = async (callback: () => unknown) => {
    try {
      startMockLoader();
      setIsLoading(true);

      const value = await callback();
      setIsMockLoading(false);
      setIsLoading(false);

      return value;
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
    performAction,
  };
};
