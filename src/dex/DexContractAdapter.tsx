import { ContractParamsProvider } from "redstone-sdk";
import { DexContract, TokenContract } from "./DexContractConnector";
import { FUEL_ASSET_DENOMINATOR } from "../config/constants";

export class DexContractAdapter implements DexContractAdapter {
  constructor(
    private contract: DexContract,
    private tokenContract: TokenContract,
    private gasLimit: number
  ) {}

  async getEthPrice(paramsProvider: ContractParamsProvider): Promise<number> {
    const result = await this.contract.functions
      .get_eth_price(await paramsProvider.getPayloadData())
      .get();

    return result.value.d.toNumber() / 10 ** 8;
  }

  async changeEthToToken(
    paramsProvider: ContractParamsProvider,
    amount: number
  ): Promise<string> {
    const result = await this.contract.functions
      .change_eth_to_usd(await paramsProvider.getPayloadData())
      .callParams({ forward: { amount: amount * FUEL_ASSET_DENOMINATOR } })
      .addContracts([
        // @ts-ignore
        this.tokenContract,
      ])
      .txParams({
        gasLimit: this.gasLimit,
        gasPrice: 1,
        variableOutputs: 1,
      })
      .call();

    return result.transactionId;
  }

  async withdrawFunds(): Promise<string> {
    const result = await this.contract.functions
      .withdraw_funds()
      .txParams({
        gasLimit: this.gasLimit,
        gasPrice: 1,
        variableOutputs: 1,
      })
      .call();

    return result.transactionId;
  }
}
