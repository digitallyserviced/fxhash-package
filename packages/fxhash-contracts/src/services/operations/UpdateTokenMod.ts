import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { GenerativeToken } from "../../types/entities/GenerativeToken"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TUpdateTokenModOperationParams = {
  token: GenerativeToken
  tags: number[]
}

export class UpdateTokenModOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosUpdateTokenModOperation
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
export class TezosUpdateTokenModOperation extends TezosContractOperation<TUpdateTokenModOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(FxhashContracts.ISSUER)
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
