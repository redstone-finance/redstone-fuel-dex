import { ChainDataTable } from "../components/ChainDataTable";
import { GetPriceLoader } from "../components/GetPriceLoader";
import { PricesTable } from "../components/PricesTable";
import { WritePricesButton } from "../components/WritePricesButton";
import { ChainTx } from "../components/ChainTx";
import { useMockLoader } from "../hooks/useMockLoader";
import { usePricesContract } from "../hooks/usePricesContract";
import { ChainDetails } from "../config/chains";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { Prices } from "../types";
import Modal from "../components/Modal";
import { WalletLocked, WalletUnlocked } from "fuels";
import { DexContractConnector } from "../hooks/IDexContractAdapter";
import { GetPriceButton } from "../components/GetPriceButton";

interface Props {
  props: {
    prices: Prices;
    setPrices: Dispatch<SetStateAction<Prices>>;
    walletAddress: string;
    wallet: WalletLocked | WalletUnlocked | undefined;
    changePrivateKey: ChangeEventHandler<HTMLInputElement>;
  };
  network: ChainDetails | null;
}

export const FuelBlock = ({ props, network }: Props) => {
  const { prices, walletAddress, wallet, changePrivateKey } = props;
  const { text, isMockLoading, setIsMockLoading, startMockLoader } =
    useMockLoader();
  const connector = new DexContractConnector(
    wallet!,
    network?.exampleContractAddress!
  );

  const {
    blockNumber,
    txHash,
    timestamp,
    isLoading,
    changeEthToUsd,
    withdrawFunds,
    errorMessage,
    setErrorMessage,
  } = usePricesContract(network, connector, startMockLoader, setIsMockLoading);

  const arePrices = false;

  return !wallet ? (
    <p className="mt-10 mb-0 text-lg text-center">
      <b>Please sign in to Fuel</b>
      {!window.fuel && (
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
              onChange={changePrivateKey}
            />
          </div>
        </div>
      )}
    </p>
  ) : (
    <div className="flex w-full justify-center items-center mt-8 flex-col">
      {network && (
        <ChainDataTable walletAddress={walletAddress} network={network} />
      )}
      {isMockLoading || isLoading ? (
        <GetPriceLoader text={isMockLoading ? text : ""} />
      ) : (
        [
          arePrices && (
            <PricesTable
              blockNumber={blockNumber}
              timestamp={timestamp}
              prices={prices}
            />
          ),
          <div className="flex gap-3">
            <GetPriceButton getPriceFromContract={changeEthToUsd} />
            <WritePricesButton writePricesToContract={withdrawFunds} />
          </div>,

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
          network && txHash && <ChainTx txHash={txHash} network={network} />,
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