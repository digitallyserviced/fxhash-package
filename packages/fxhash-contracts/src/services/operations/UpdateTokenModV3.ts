import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { GenerativeToken } from "../../types/entities/GenerativeToken"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TUpdateTokenModV3OperationParams = {
  token: GenerativeToken
  tags: number[]
}

export class UpdateTokenModV3Operation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosUpdateTokenModV3Operation

      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Update the general settings of the an issuer
 * issuer > update_issuer
 */
class TezosUpdateTokenModV3Operation extends TezosContractOperation<TUpdateTokenModV3OperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(FxhashContracts.ISSUER_V3)
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.update_token_mod({
      issuer_id: this.params.token.id,
      tags: this.params.tags,
    }).send()
  }

  success(): string {
    return `You have updated the labels of the project "${this.params.token.name}"`
  }
}
