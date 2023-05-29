// @ts-ignore
import WalletIcon from "../assets/icons/wallet.png";
// @ts-ignore
import ContractIcon from "../assets/icons/contract.png";
// @ts-ignore
import EthIcon from "../assets/eth.svg";
// @ts-ignore
import UsdIcon from "../assets/dollar.svg";
import { formatAmount } from "../utils";

interface Props {
  walletAddress: string;
  contractAddress: string;
  addressExplorerUrl: string;
  walletEthAmount: number;
  walletTokenAmount: number;
}

export const ChainDataTable = ({
  walletAddress,
  walletEthAmount,
  walletTokenAmount,
  addressExplorerUrl,
}: Props) => (
  <table className="w-3/5 table-auto border mb-8">
    <tbody className="text-md">
      <tr>
        <td className="py-3 px-3 underline  hyphens-auto font-semibold text-gray-700 ">
          <img
            className="object-scale-down w-6 h-6 inline"
            src={WalletIcon}
            alt="Wallet icon"
          />
          <span className="inline-block px-3">
            <a
              href={addressExplorerUrl}
              target="blank"
              referrerPolicy="no-referrer"
              className="underline align-baseline"
            >
              {walletAddress}
            </a>
          </span>
        </td>
      </tr>
      <tr>
        <td className="px-3">
          <span className="font-semibold text-gray-700 w-28 h-6 inline-block text-right text-lg">
            {formatAmount(walletEthAmount, true)}
            <img
              className="h-6 w-6 inline relative align-baseline left-2 top-1"
              src={EthIcon}
              alt="ETH Icon"
            />
          </span>

          <span className="font-semibold text-gray-700 w-48 h6 inline-block  text-right text-lg">
            {formatAmount(walletTokenAmount, true)}
            <img
              className="h-6 w-6 inline relative align-baseline left-2 top-1"
              src={UsdIcon}
              alt="ETH Icon"
            />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
);
