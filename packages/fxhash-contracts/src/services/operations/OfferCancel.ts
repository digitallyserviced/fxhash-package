import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { Objkt } from "../../types/entities/Objkt"
import { Offer } from "../../types/entities/Offer"
import { displayMutez } from "../../utils/units"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TOfferCancelOperationParams = {
  offer: Offer
  objkt: Objkt
}

export class OfferCancelOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosOfferCancelOperation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * List a gentk on the Marketplace
 */
class TezosOfferCancelOperation extends TezosContractOperation<TOfferCancelOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      FxhashContracts.MARKETPLACE_V2
    )
  }

  async call(): Promise<WalletOperation> {
    return this.contract!.methodsObject.offer_cancel(
      this.params.offer.id
    ).send()
  }

  success(): string {
    return `You have cancelled your offer of ${displayMutez(
      this.params.offer.price
    )} on ${this.params.objkt.name}`
  }
}
