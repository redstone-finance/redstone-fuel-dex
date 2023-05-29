import { GetPriceLoader } from "../components/GetPriceLoader";
import { WithdrawFundsButton } from "../components/WithdrawFundsButton";
import { ChainTx } from "../components/ChainTx";
import { useMockLoader } from "../hooks/useMockLoader";
import { useRedstoneContract } from "../hooks/useRedstoneContract";
import {
  FUEL_ADDRESS_EXPLORER_URL,
  FUEL_ASSET_DENOMINATOR,
  FUEL_DEX_CONTRACT_ID,
  FUEL_DEX_CONTRACT_OWNER,
  FUEL_TOKEN_ID,
  FUEL_TX_EXPLORER_URL,
} from "../config/constants";
import { ChangeEventHandler, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { WalletLocked, WalletUnlocked } from "fuels";
import { DexContractAdapter } from "./DexContractAdapter";
import { ExchangeButton } from "../components/ExchangeButton";
import { paramsProvider } from "./params_provider";
import { ChainDataTable } from "../components/ChainDataTable";
import { Amounts } from "../hooks/useFuel";
import { Swap } from "./Swap";
import { DexContractConnector } from "./DexContractConnector";

interface Props {
  props: {
    isSelected: boolean;
    walletAddress: string;
    wallet: WalletLocked | WalletUnlocked | undefined;
    usePrivateKey: ChangeEventHandler<HTMLInputElement>;
  };
}

export const DexBlock = ({ props }: Props) => {
  const [txHash, setTxHash] = useState("");
  const [amounts, setAmounts] = useState<Amounts | null>(null);
  const [ethAmount, setEthAmount] = useState(0);

  const { isSelected, walletAddress, wallet, usePrivateKey } = props;
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();
  const connector = new DexContractConnector(wallet!, FUEL_DEX_CONTRACT_ID);

  const { isLoading, performContractAction, errorMessage, setErrorMessage } =
    useRedstoneContract(connector, startMockLoader, setIsMockLoading);

  const changeEthToToken = async () => {
    await performContractAction(async (adapter: DexContractAdapter) => {
      const txHash = await adapter.changeEthToToken(paramsProvider, ethAmount);

      setTxHash(txHash);
      await updateAmounts();
    });
  };

  const withdrawFunds = async () => {
    await performContractAction(async (adapter: DexContractAdapter) => {
      const txHash = await adapter.withdrawFunds();

      setTxHash(txHash);
      await updateAmounts();
    });
  };

  const getEthPrice = async () => {
    return (await performContractAction(async (adapter: DexContractAdapter) => {
      return await adapter.getEthPrice(paramsProvider);
    })) as number;
  };

  const ethAmountChanged = (ethAmount: number) => {
    setEthAmount(ethAmount);
  };

  const updateAmounts = async () => {
    let amounts: Amounts = {};
    if (wallet) {
      const values = await Promise.all([
        wallet.getBalance(),
        wallet.getBalance(FUEL_TOKEN_ID),
      ]);
      console.log(values);
      const ethAmount = values[0].toNumber() / FUEL_ASSET_DENOMINATOR;
      const tokenAmount = values[1].toNumber() / FUEL_ASSET_DENOMINATOR;

      amounts["ETH"] = ethAmount;
      amounts[FUEL_TOKEN_ID] = tokenAmount;
    }

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

  return !wallet ? (
    <p className="mt-10 mb-0 text-lg text-center">
      {!window.fuel && [
        <b>Please sign in to Fuel</b>,
        <div className="px-6 py-3 text-sm w-full text-center text-gray-500 mt-8 border">
          <div className="w-full mb-2">
            The Fuel Wallet extension you can install from here:{" "}
            <b>
              <a
                target="_blank"
                href="https://wallet.fuel.network/docs/install/"
              >
                https://wallet.fuel.network/docs/install/
              </a>
            </b>
          </div>
          <div className="w-full mt-2">
            or pass your fuel-wallet's <b>PRIVATE KEY</b> below: <br />
            <input
              className="text-sm w-full align-center gap-2 border mt-1 py-2 px-2 rounded"
              type="password"
              name="private_key"
              id="private_key"
              onChange={usePrivateKey}
            />
          </div>
        </div>,
      ]}
    </p>
  ) : (
    <div className="flex w-full justify-center items-center mt-8 flex-col">
      {isSelected &&
        amounts && [
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
          isSelected && amounts && (
            <div className="flex gap-3">
              {walletAddress == FUEL_DEX_CONTRACT_OWNER && (
                <WithdrawFundsButton onClick={withdrawFunds} />
              )}
              <ExchangeButton onClick={changeEthToToken} />
            </div>
          ),
          <div className="px-6 py-3 text-sm w-3/5 text-center text-gray-500">
            <i>
              To <b>interact with the contract</b> you should have <b>ETH</b> be
              added to the wallet <br /> by using{" "}
              <b>
                <a target="_blank" href="https://faucet-beta-3.fuel.network/">
                  https://faucet-beta-3.fuel.network/
                </a>
              </b>
            </i>
          </div>,
          isSelected && txHash && (
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
  );
};
