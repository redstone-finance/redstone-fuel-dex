import { GetPriceLoader } from "../components/GetPriceLoader";
import { WithdrawFundsButton } from "../components/WithdrawFundsButton";
import { ChainTx } from "../components/ChainTx";
import { useMockLoader } from "../hooks/useMockLoader";
import { useLoaders } from "../hooks/useLoaders";
import {
  FUEL_ADDRESS_EXPLORER_URL,
  FUEL_ASSET_DENOMINATOR,
  FUEL_DEX_CONTRACT_ID,
  FUEL_DEX_CONTRACT_OWNER,
  FUEL_TOKEN_ID,
  FUEL_TX_EXPLORER_URL,
} from "../config/constants";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { WalletLocked, WalletUnlocked } from "fuels";
import { ExchangeButton } from "../components/ExchangeButton";
import { paramsProvider } from "./params_provider";
import { ChainDataTable } from "../components/ChainDataTable";
import { Swap } from "./Swap";
import { DexContractAdapter } from "./DexContractAdapter";
import { Amounts, BalanceFetcher } from "../scripts/BalanceFetcher";

interface Props {
  props: {
    adapterPromise: Promise<DexContractAdapter>;
    walletAddress: string;
    wallet: WalletLocked | WalletUnlocked | undefined;
  };
}

export const DexBlock = ({ props }: Props) => {
  const [txHash, setTxHash] = useState("");
  const [amounts, setAmounts] = useState<Amounts | null>(null);
  const [ethAmount, setEthAmount] = useState(0);

  const { adapterPromise, walletAddress, wallet } = props;
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();

  const { isLoading, performAction, errorMessage, setErrorMessage } =
    useLoaders(startMockLoader, setIsMockLoading);

  const changeEthToToken = async () => {
    await performAction(async () => {
      const txHash = await (
        await adapterPromise
      ).changeEthToToken(paramsProvider, ethAmount);

      setTxHash(txHash);
      await updateAmounts();
    });
  };

  const withdrawFunds = async () => {
    await performAction(async () => {
      const txHash = await (await adapterPromise).withdrawFunds();

      setTxHash(txHash);
      await updateAmounts();
    });
  };

  const getEthPrice = async () => {
    return (await performAction(async () => {
      return await (await adapterPromise).getEthPrice(paramsProvider);
    })) as number;
  };

  const ethAmountChanged = (ethAmount: number) => {
    setEthAmount(ethAmount);
  };

  const updateAmounts = async () => {
    let amounts = await new BalanceFetcher(wallet).fetchAmounts();

    setAmounts(amounts);
  };

  let amountsWallet: WalletLocked | WalletUnlocked | undefined = undefined;

  useEffect(() => {
    if (amountsWallet == wallet) {
      return;
    }
    amountsWallet = wallet;
    updateAmounts();
  }, [wallet]);

  return (
    (wallet && (
      <div className="flex w-full justify-center items-center mt-8 flex-col">
        {amounts && [
          <ChainDataTable
            walletAddress={walletAddress}
            contractAddress={FUEL_DEX_CONTRACT_ID}
            addressExplorerUrl={FUEL_ADDRESS_EXPLORER_URL.replace(
              "{walletAddress}",
              walletAddress
            )}
            walletEthAmount={amounts["ETH"] || 0}
            walletTokenAmount={amounts[FUEL_TOKEN_ID] || 0}
          />,
          <Swap props={{ priceCallback: getEthPrice, ethAmountChanged }} />,
        ]}
        {isMockLoading || isLoading ? (
          <GetPriceLoader text={isMockLoading ? text : ""} />
        ) : (
          [
            amounts && (
              <div className="flex gap-3">
                {walletAddress == FUEL_DEX_CONTRACT_OWNER && (
                  <WithdrawFundsButton onClick={withdrawFunds} />
                )}
                <ExchangeButton onClick={changeEthToToken} />
              </div>
            ),
            <div className="px-6 py-3 text-sm w-3/5 text-center text-gray-500">
              <i>
                To <b>interact with the contract</b> you should have <b>ETH</b>{" "}
                be added to the wallet <br /> by using{" "}
                <b>
                  <a target="_blank" href="https://faucet-beta-3.fuel.network/">
                    https://faucet-beta-3.fuel.network/
                  </a>
                </b>
              </i>
            </div>,
            txHash && (
              <ChainTx txHash={txHash} txExplorerUrl={FUEL_TX_EXPLORER_URL} />
            ),
          ]
        )}
        {!!errorMessage && (
          <Modal
            closeModal={() => setErrorMessage("")}
            title="Problem with contract interaction"
            text={errorMessage}
          />
        )}
      </div>
    )) || <div></div>
  );
};
