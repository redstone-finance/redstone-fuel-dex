// @ts-ignore
import WalletIcon from "../assets/icons/wallet.png";
// @ts-ignore
import ContractIcon from "../assets/icons/contract.png";

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
  contractAddress,
  addressExplorerUrl,
}: Props) => (
  <table className="w-3/5 table-auto border mb-8">
    <tbody className="text-md">
      <tr>
        <td className="flex items-center gap-3 py-3 px-3">
          <img
            className="object-scale-down w-6 h-6"
            src={ContractIcon}
            alt="Contract icon"
          />
          Integrated Contract
        </td>
        <td className="py-3 px-3 text-right"> {contractAddress}</td>
      </tr>
      <tr>
        <td className="flex items-center gap-3 py-3 px-3">
          <img
            className="object-scale-down w-6 h-6"
            src={WalletIcon}
            alt="Wallet icon"
          />
          Your wallet
        </td>
        <td className="py-3 px-3 text-right underline">
          {" "}
          <a
            href={addressExplorerUrl}
            target="blank"
            referrerPolicy="no-referrer"
          >
            {walletAddress}
          </a>
        </td>
      </tr>

      <tr>
        <td className="flex items-center gap-3 py-3 px-3">Amount: </td>
        <td className="py-3 px-3 text-right">
          <b>
            {walletEthAmount.toLocaleString("en-us", {
              minimumFractionDigits: 3,
            })}
          </b>{" "}
          ETHs
        </td>
      </tr>
      <tr>
        <td></td>
        <td className="py-3 px-3 text-right">
          <b>
            {walletTokenAmount.toLocaleString("en-us", {
              minimumFractionDigits: 3,
            })}
          </b>{" "}
          Tokens
        </td>
      </tr>
    </tbody>
  </table>
);
