import {
  ContractAbstraction,
  MichelsonMap,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { NFTArticle } from "../../types/entities/Article"
import { FxhashContracts } from "../../types/Contracts"
import { stringToByteString } from "../../utils/convert"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TUpdateArticleOperationParams = {
  article: NFTArticle
  metadataCid: string
}

export class UpdateArticleOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosUpdateArticleOperation

      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class TezosUpdateArticleOperation extends TezosContractOperation<TUpdateArticleOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(FxhashContracts.ARTICLES)
  }

  async call(): Promise<TransactionWalletOperation> {
    // build the metadata map
    const metadata = new MichelsonMap()
    metadata.set("", stringToByteString(`ipfs://${this.params.metadataCid}`))

    return this.contract!.methodsObject.update_metadata({
      token_id: this.params.article.id,
      metadata: metadata,
    }).send()
  }

  success(): string {
    return `Your article was successfully minted.`
  }
}
