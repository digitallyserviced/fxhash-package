import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import {
  FxhashCollabFactoryCalls,
  FxhashContracts,
} from "../../types/Contracts"
import { GenerativeToken } from "../../types/entities/GenerativeToken"
import { UserType } from "../../types/entities/User"
import { EBuildableParams, pack } from "../parameters-builder/BuildParameters"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TBurnSupplyOperationParams = {
  token: GenerativeToken
  supply: number
}

export class BurnSupplyOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosBurnSupplyOperation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Burns some supply of a Generative Token
 */
class TezosBurnSupplyOperation extends TezosContractOperation<TBurnSupplyOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  collab = false

  async prepare() {
    this.collab = this.params.token.author.type === UserType.COLLAB_CONTRACT_V1
    this.contract = await this.manager.getContract(
      this.collab ? this.params.token.author.id : FxhashContracts.ISSUER
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    const params = {
      issuer_id: this.params.token.id,
      amount: this.params.supply,
    }

    // if the author is a collab contract, we have to call the collab contract
    // proposal EP instead
    if (this.collab) {
      const packed = pack(params, EBuildableParams.BURN_SUPPLY)
      return this.contract!.methodsObject.make_proposal({
        call_id: FxhashCollabFactoryCalls.BURN_SUPPLY,
        call_params: packed,
      }).send()
    } else {
      return this.contract!.methodsObject.burn_supply(params).send()
    }
  }

  success(): string {
    return this.collab
      ? `A proposal to burn ${this.params.supply} editions of ${this.params.token.name} was successfully sent`
      : `You have burnt ${this.params.supply} editions of ${this.params.token.name}`
  }
}
