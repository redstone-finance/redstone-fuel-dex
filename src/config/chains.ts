import { utils } from "ethers";
import FuelLogo from "../assets/chains/fuel.svg";

export type Chains = { [chainId in number]: ChainDetails };

export type ChainType = "eth" | "starknet" | "fuel";

export interface ChainDetails {
  chainId: string;
  rpcUrls: string[];
  chainName: string;
  label: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
  exampleContractAddress: string;
  contractExplorerUrl: string;
  txExplorerUrl?: string;
  logo?: any;
  type?: ChainType;
}

export const chains: Chains = {
  [9999999999]: {
    chainId: utils.hexValue(9999999999),
    rpcUrls: ["http://localhost:4000/graphql"],
    chainName: "Fuel Beta-3 Network",
    label: "Fuel",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://fuellabs.github.io/block-explorer-v2/block/"],
    exampleContractAddress:
      "0x6d98583228051ce2a14968daad63b7bf22f3edb0af02e75b68da017d037b1412",
    contractExplorerUrl:
      "https://fuellabs.github.io/block-explorer-v2/beta-3/#/address/{walletAddress}",
    txExplorerUrl:
      "https://fuellabs.github.io/block-explorer-v2/beta-3/#/transaction/",
    logo: FuelLogo,
    type: "fuel",
  },
};
