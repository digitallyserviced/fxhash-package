import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { NFTArticle } from "../../types/entities/Article"
import { Listing } from "../../types/entities/Listing"
import { displayMutez } from "../../utils/units"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TListingV3CancelOperationParams = {
  listing: Listing
  article: NFTArticle
}

export class ListingV3CancelOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosListingV3CancelOperation

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
export class TezosListingV3CancelOperation extends TezosContractOperation<TListingV3CancelOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  ep = ""

  async prepare() {
    this.contract = await this.manager.getContract(
      FxhashContracts.MARKETPLACE_V3
    )
  }

  async call(): Promise<WalletOperation> {
    return this.contract!.methodsObject.listing_cancel(
      this.params.listing.id
    ).send()
  }

  success(): string {
    return `You have cancelled your listing of ${
      this.params.listing.amount
    } editions for ${displayMutez(this.params.listing.price)} tez each on ${
      this.params.article.title
    }`
  }
}
