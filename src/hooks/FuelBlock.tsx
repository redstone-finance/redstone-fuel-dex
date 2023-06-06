//@ts-ignore
import FuelLogo from "../assets/fuel.svg";
import { WalletLocked, WalletUnlocked } from "fuels";

interface Props {
  props: {
    onPrivateKeyChange: (value: string) => void;
    onChainClick: () => void;
    wallet: WalletLocked | WalletUnlocked | undefined;
  };
}

export const FuelBlock = ({ props }: Props) => {
  return (
    <p className="mt-10 mb-0 text-lg text-center">
      {!window.fuel
        ? [
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
                  onChange={async (e) => {
                    await props.onPrivateKeyChange(e.target.value);
                  }}
                />
              </div>
            </div>,
          ]
        : [
            !props.wallet && (
              <p className="mb-10 text-lg font-bold">
                Please select the chain-button to integrate your wallet:
              </p>
            ),
            <button
              className={`inline-flex align-center gap-2 border py-2 px-2 rounded ${
                props.wallet && "border-redstone"
              } disabled:opacity-30 hover:scale-110	ease-in-out duration-300 `}
              onClick={props.onChainClick}
              disabled={false}
            >
              <img
                style={{ height: 24, width: 24 }}
                src={FuelLogo}
                alt={`Fuel logo`}
              />
              Fuel
            </button>,
          ]}
    </p>
  );
};
