const IS_LOCAL = false;

export const FUEL_RPC_URL = IS_LOCAL
  ? "http://localhost:4000/graphql"
  : "https://beta-3.fuel.network/graphql";

export const FUEL_ASSET_DENOMINATOR = 10 ** 9;
export const FUEL_NETWORK_NAME = "Fuel Beta-3 Network";
export const FUEL_BLOCK_EXPLORER_URL =
  "https://fuellabs.github.io/block-explorer-v2/block/";
export const FUEL_ADDRESS_EXPLORER_URL =
  "https://fuellabs.github.io/block-explorer-v2/beta-3/#/address/{walletAddress}";
export const FUEL_TX_EXPLORER_URL =
  "https://fuellabs.github.io/block-explorer-v2/beta-3/#/transaction/";

export const FUEL_TOKEN_ID =
  "0x6cb020a8d81d9394b9b3c70e0994b33835d43dd8069b0e427be574a2ee3c3437";
export const FUEL_DEX_CONTRACT_ID =
  "0x6d98583228051ce2a14968daad63b7bf22f3edb0af02e75b68da017d037b1412";
export const FUEL_DEX_CONTRACT_OWNER =
  "fuel16hn6vhqxxnn0f7ft8zskmu8759rndwzyl67eqqnj2neqpz7ln8yqm40tkm";
