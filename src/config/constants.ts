const IS_LOCAL = true;

export const FUEL_RPC_URL = IS_LOCAL
  ? "http://127.0.0.1:4000/graphql"
  : "https://beta-3.fuel.network/graphql";

export const FUEL_ASSET_DENOMINATOR = 10 ** 9;
export const FUEL_BLOCK_EXPLORER_URL =
  "https://fuellabs.github.io/block-explorer-v2/block/";
export const FUEL_ADDRESS_EXPLORER_URL =
  "https://fuellabs.github.io/block-explorer-v2/beta-3/#/address/{walletAddress}";
export const FUEL_TX_EXPLORER_URL =
  "https://fuellabs.github.io/block-explorer-v2/beta-3/#/transaction/";

export const FUEL_TOKEN_ID =
  "0x6cb020a8d81d9394b9b3c70e0994b33835d43dd8069b0e427be574a2ee3c3437";
export const FUEL_DEX_CONTRACT_ID =
  "0x55797523ba8c98e0187a4b6db622f2c62bc2ad90c04a055c3910ee65842da792";
export const FUEL_DEX_CONTRACT_OWNER =
  "fuel16hn6vhqxxnn0f7ft8zskmu8759rndwzyl67eqqnj2neqpz7ln8yqm40tkm";
