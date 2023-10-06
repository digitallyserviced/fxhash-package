export interface ITezosContracts {
  allowed_mint: string
  allowed_mint_issuer: string
  allowed_mint_issuer_v3: string
  allowed_mint_v3: string
  articles: string
  collaboration_factory: string
  consumable_database: string
  cycles: string
  gentk_v1: string
  gentk_v1_data: string
  gentk_v2: string
  gentk_v3: string
  issuer_tickets: string
  issuer_v0: string
  issuer_v1: string
  issuer_v2: string
  issuer_v3: string
  marketplace_v1: string
  marketplace_v2: string
  marketplace_v3: string
  moderation_articles: string
  moderation_team: string
  moderation_token: string
  moderation_token_v3: string
  moderation_user: string
  pricing_dutch_auction: string
  pricing_dutch_auction_v3: string
  pricing_fixed: string
  pricing_fixed_v3: string
  randomizer: string
  token_moderation: string
  treasury: string
  user_moderation: string
  user_register: string
  onchfs_files: string
}

export interface ITezosApis {
  tzktWebsite: string
  tzkt: string
  rpcs: string[]
}

export interface IEthContracts {
  chain_id: number
  reservoir_zone: string
  project_factory: string
  slits_factory: string
  splits_main: string
  scripty_storage: string
  scripty_builder: string
}

export interface IEthApis {
  rpc_nodes: string
  reservoir_api: string
}

export interface IFxhashApis {
  website: string
  main: string
  file: string
  fsEmulator: string
  extract: string
  media: string
  ipfsGateway: string
  ipfsGatewaySafe: string
  onchfsProxy: string
  authority: {
    api: string
  }
  capture: {
    lambdas: {
      small: string
      medium: string
      large: string
    }
  }
  dashboard: {
    backend: string
    aggregator: string
  }
  events: {
    liveBackend: string
  }
}

export interface IFxhashNetworkConfig {
  network: string
}

export interface IFxhashEnvConfig {
  envName: string
}

// the variations supported by the config
export type TBlockchain = "tez" | "eth"
export type TBlockchainNetwork = "testnet" | "mainnet"
export type TEnv = "dev" | "prd"

type TBlockchainContacts = {
  [B in TBlockchain]: {
    tez: ITezosContracts
    eth: IEthContracts | null
  }[B]
}

type TBlockchainApis = {
  [B in TBlockchain]: {
    tez: ITezosApis
    eth: IEthApis | null
  }[B]
}

type TNetworkBlockchainConfig = {
  [B in TBlockchain]: {
    tez: IFxhashNetworkConfig
    eth: IFxhashNetworkConfig
  }[B]
}

export type IFxhashConfig = {
  networks: {
    [N in TBlockchainNetwork]: {
      [B in TBlockchain]: {
        contracts: TBlockchainContacts[B]
        config: TNetworkBlockchainConfig[B]
        apis: TBlockchainApis[B]
      }
    }
  }
  envs: {
    [K in TEnv]: {
      apis: IFxhashApis
      config: IFxhashEnvConfig
    }
  }
}

const ethDevContracts: IEthContracts = {
  chain_id: 31337,
  reservoir_zone: "",
  project_factory: "0xcaa7B1B6F4AcFD3dBFB3535144d474c0816A2A8B",
  slits_factory: "",
  splits_main: "0x67C3a8BEdED95E705982506da4757A5f419Dc513",
  scripty_storage: "0x30a970169C85bAc4686eAFb9435C1af8aac9c6A1",
  scripty_builder: "0x9C14ffB81f2362a3d2EdCbd83dA73B1a970974c8",
}

const ethTestContracts: IEthContracts = {
  chain_id: 5,
  reservoir_zone: "0xAee17A0E6e98e832112fD0A26dA22C4e812AA7F5",
  project_factory: "0x34ED5378335dd7DC1b51d058fd9d6edb6b435489",
  slits_factory: "0xC06935D9E1454FCcEAE2BE0977725D58aFC55aFf",
  splits_main: "0x2ed6c4B5dA6378c7897AC67Ba9e43102Feb694EE",
  scripty_storage: "0x4e2f40eef8DFBF200f3f744a9733Afe2E9F83D28",
  scripty_builder: "0xccd7E419f1EEc86fa748c9079584e3a89312f11C",
}

const ethDevApis: IEthApis = {
  rpc_nodes: "https://ganache.fxhash-dev.xyz/",
  reservoir_api: ""
}

const ethTestnetApis: IEthApis = {
  rpc_nodes: "https://rpc-goerli.fxhash-dev.xyz/",
  reservoir_api: "https://api-goerli.reservoir.tools"
}

// The Tezos Smart Contracts addresses on testnet
const tezosTestnetContracts: ITezosContracts = {
  allowed_mint: "KT1QwfqMUDRYVyxo9KhunY5YCx9qQ9LWcswr",
  allowed_mint_issuer: "KT1WDByFKQmgVynxSr2rzdijs5aSs7mo7eBM",
  allowed_mint_issuer_v3: "KT1S3UqrLgMpVivNWWmBUnkPCaSFHDJ4HYvb",
  allowed_mint_v3: "KT1HUE2A6CHNw4NZZBWjJyG38nysWWfusagu",
  articles: "KT1HV8NXUCKWC1tWNHSD8LPPiKPshQuXvb8r",
  collaboration_factory: "KT1WFXts7jwxpD9uGDKzyqTUTFaG222xmjoZ",
  consumable_database: "KT1FP9y1PJpJkXhdJCgYZhVbj9UBpxnA57Bx",
  cycles: "KT1BJBcvtgZM2Kf4rUapmp4AhXtWCmznxd6F",
  gentk_v1: "KT1ExHjELnDuat9io3HkDcrBhHmek7h8EVXG",
  gentk_v1_data: "KT1SquPSN9oiMUWHG9coKRJAwz8Afe4c6izT",
  gentk_v2: "KT1NkZho1yRkDdQnN4Mz93sDYyY2pPrEHTNs",
  gentk_v3: "KT1TtVAyjh4Ahdm8sLZwFnL7tqoLf59XrK2h",
  issuer_tickets: "KT19PBsvmB2CwFqXftzb5gNJfxrEDFdSxGKZ",
  issuer_v0: "KT1PyfrDD85RxUWz8dMHoC92MxdPzecSQ5t9",
  issuer_v1: "KT1QwWVZogqPZZtGSVxGpLkEWar7LFvAsMdd",
  issuer_v2: "KT1Sy7X6TubmZ39G8CHVrUcxjc3jiF68P8oB",
  issuer_v3: "KT1DfymMp3qD5Pd5ujPjp7UsQbppY9yY1Hbf",
  marketplace_v1: "KT1DbivePcuUzCp5RaAQWxPSLV9G2Ys4faUR",
  marketplace_v2: "KT1HFYtf4vNCr4xRDZxLKc5asUdCsPUTTW9R",
  marketplace_v3: "KT1J6rt4d9U785DZWYEPvQ2fR1e71gxP42Lj",
  moderation_articles: "KT1Qg78fa81Xyjh65yNqUgVucubHUyq6VmgL",
  moderation_team: "KT1RsfyWzHs1EEWMzFLmKnJTQwPqRzsnF3Dp",
  moderation_token: "KT1PokFR36CcXKh3jUnjncabcuPWm5BMiqjt",
  moderation_token_v3: "KT1C1J38YR6eDvRBDEDaypptCFda9aH7FRbJ",
  moderation_user: "KT1Q3s7mYpscCnwsyndrVZg9WqBCmw99n37g",
  pricing_dutch_auction: "KT1BqikbUisiBBd9WvPiqnTwLY8Pm68p2Aua",
  pricing_dutch_auction_v3: "KT1QCboxZ28SqsfyZWTDrkSpZzU6xjZXBsFb",
  pricing_fixed: "KT1PAsf9Zc9FGJA9iLE1Ab2vPkMDsh4hyZVi",
  pricing_fixed_v3: "KT1Mqyy5JPknNzNJtgF93SHpFHv4VcYrNZry",
  randomizer: "KT1QmdsrJWJgK3VXid8q7D4sPipVoc9jh12x",
  token_moderation: "KT1BHfPDMRp2q48ZkmmnK7TRzQRdFnp6XVKq",
  treasury: "KT1MbDbRhZPs5TzZEXkT142ePoccFHfohBoo",
  user_moderation: "KT1LmZjoitx2itnB1qCbHMrT3V64RbuSPf3a",
  user_register: "KT1XaikgmBDQANBvkFqyFhSpgAZJAXpiDFGE",
  onchfs_files: "KT1FA8AGGcJha6S6MqfBUiibwTaYhK8u7s9Q",
}
const tezosTestnetApis: ITezosApis = {
  tzkt: "https://api.ghostnet.tzkt.io/v1/",
  tzktWebsite: "https://ghostnet.tzkt.io/",
  rpcs: [
    "https://ghostnet.ecadinfra.com",
    "https://ghostnet.smartpy.io",
    "https://ghostnet.tezos.marigold.dev/",
  ],
}

// The Tezos Smart Contracts on mainnet
const tezosMainnetContracts: ITezosContracts = {
  allowed_mint: "KT1VDQwskdfHkSbA9W6CSEnxnh1u1XU8K8Gu",
  allowed_mint_issuer: "KT1Djz5ix2yEGmV7PMq3GYq17TvMMkd1anT2",
  allowed_mint_issuer_v3: "KT1LJ4R4xoEWMgTjrGrdHJAeHLYFaB4RsoVK",
  allowed_mint_v3: "KT1KgEjxqfRCMwtCGifT6fDPwC35RptTUEvE",
  articles: "KT1GtbuswcNMGhHF2TSuH1Yfaqn16do8Qtva",
  collaboration_factory: "KT1JrUPSCt1r2MB2J7Lk2KwiWSYr3Mr414ck",
  consumable_database: "KT1Wm3zZqRd6JBbZWuatKYZCmnqUMy2Y79BL",
  cycles: "KT1BgD9SPfysnMz3vkfm6ZEaGFKCVcE5ay91",
  gentk_v1: "KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE",
  gentk_v1_data: "KT1WRpPyXHSCbTfDQFWVXbMpxxvf7Y7KChxc",
  gentk_v2: "KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi",
  gentk_v3: "KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr",
  issuer_tickets: "KT19etLCjCCzTLFFAxsxLFsVYMRPetr2bTD5",
  issuer_v0: "KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS",
  issuer_v1: "KT1XCoGnfupWk7Sp8536EfrxcP73LmT68Nyr",
  issuer_v2: "KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv",
  issuer_v3: "KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b",
  marketplace_v1: "KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9",
  marketplace_v2: "KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u",
  marketplace_v3: "KT1M1NyU9X4usEimt2f3kDaijZnDMNBu42Ja",
  moderation_articles: "KT1A36z7nG4zPDbhjyrzhYf9SCn5ipPZeRMQ",
  moderation_team: "KT1FvGQcPxzuJkJsdWFQiGkueSNT5mqpFDrf",
  moderation_token: "KT18tPu7uXy9PJ97i3qCLsr7an4X6sQ5qxU7",
  moderation_token_v3: "KT1UBWXN1KxTh4eurrCTCH7aEjqdrM3HjP6R",
  moderation_user: "KT1Wn2kkKmdbyLWBiLXWCkE7fKj1LsLKar2A",
  pricing_dutch_auction: "KT1EzLrXRCXij42pKfbZPn48PuxrnVki1aYY",
  pricing_dutch_auction_v3: "KT1MFgHKorMWXeVL6qrpgjZmemirafppSg9q",
  pricing_fixed: "KT1FHzHxuMaNLYG8LdniY45M6RCfkF3AoXFh",
  pricing_fixed_v3: "KT1V24J6FVuKPU3xy6gVF6wJ3zdRXBheQhaV",
  randomizer: "KT1XYgKrzBbzsckGvXTPgxFyN7KNZ9RPYVWf",
  token_moderation: "KT1HgVuzNWVvnX16fahbV2LrnpwifYKoFMRd",
  treasury: "KT1P2BXYb894MekrCcSrnidzQYPVqitLoVLc",
  user_moderation: "KT1TWWQ6FtLoosVfZgTKV2q68TMZaENhGm54",
  user_register: "KT1Ezht4PDKZri7aVppVGT4Jkw39sesaFnww",
  // TODO: set mainnet address here
  onchfs_files: "TODO",
}
const tezosMainnetApis: ITezosApis = {
  tzkt: "https://api.tzkt.io/v1/",
  tzktWebsite: "https://tzkt.io/",
  rpcs: [
    "https://rpc1.fxhash.xyz",
    "https://mainnet.smartpy.io",
    "https://mainnet.api.tez.ie",
    "https://teznode.letzbake.com",
    "https://rpc.tzbeta.net",
  ],
}

// list of APIs dev leverages
const devApis: IFxhashApis = {
  website: "https://dev.fxhash-dev.xyz",
  main: "https://api.fxhash-dev.xyz/graphql",
  file: "https://file-api.fxhash-dev.xyz",
  fsEmulator: "https://fs-emulator.fxhash-dev.xyz",
  onchfsProxy: "https://onchfs.fxhash-dev2.xyz",
  extract: "https://extract.fxhash-dev.xyz",
  media: "https://media.fxhash.xyz",
  ipfsGateway: "https://gateway.fxhash-dev.xyz",
  ipfsGatewaySafe: "https://gateway.fxhash-dev2.xyz",
  authority: {
    api: "NONE",
  },
  capture: {
    lambdas: {
      small:
        "https://u5not5l323zczuwnrzxwkt34ra0eyidj.lambda-url.us-east-1.on.aws/",
      medium:
        "https://jgfz7a6km7fsqonej2sp3lqwvu0utnyy.lambda-url.us-east-1.on.aws/",
      large:
        "https://fzezvbp2f74yturkj4akjyrq3e0zswhb.lambda-url.us-east-1.on.aws/",
    },
  },
  dashboard: {
    backend: "https://live-minting.fxhash-dev.xyz",
    aggregator: "_NONE",
  },
  events: {
    liveBackend: "_NONE",
  },
}

// list of APIs prod leverages
const prdApis: IFxhashApis = {
  website: "https://fxhash.xyz",
  main: "https://api.fxhash.xyz/graphql",
  file: "https://file-api.fxhash.xyz",
  fsEmulator: "https://fs-emulator.fxhash.xyz", // placeholder
  onchfsProxy: "https://onchfs.fxhash2.xyz",
  extract: "https://extract.fxhash.xyz",
  media: "https://media.fxhash.xyz",
  ipfsGateway: "https://gateway.fxhash.xyz",
  ipfsGatewaySafe: "https://gateway.fxhash2.xyz",
  authority: {
    api: "NONE",
  },
  capture: {
    lambdas: {
      small:
        "https://7sz7knaaw3obgqxjyv3m4e5myu0lsbdp.lambda-url.us-east-1.on.aws/",
      medium:
        "https://tuupcq6eesbfk4veuzdfrhu7zm0zwuqy.lambda-url.us-east-1.on.aws/",
      large:
        "https://bojj24y6ucxmsyfi4uccdmiliy0dzhji.lambda-url.us-east-1.on.aws/",
    },
  },
  dashboard: {
    backend: "https://events.fxhash.xyz",
    aggregator: "NONE",
  },
  events: {
    liveBackend: "_NONE",
  },
}

export const FxhashConfig: IFxhashConfig = {
  networks: {
    testnet: {
      tez: {
        contracts: tezosTestnetContracts,
        config: {
          network: "ghostnet",
        },
        apis: tezosTestnetApis,
      },
      eth: {
        contracts: ethTestContracts,
        config: {
          network: "goerli",
        },
        apis: ethTestnetApis,
      },
    },
    mainnet: {
      tez: {
        contracts: tezosMainnetContracts,
        config: {
          network: "ghostnet",
        },
        apis: tezosMainnetApis,
      },
      eth: {
        contracts: null,
        config: {
          network: "goerli",
        },
        apis: null,
      },
    },
  },
  envs: {
    dev: {
      apis: devApis,
      config: {
        envName: "development",
      },
    },
    prd: {
      apis: prdApis,
      config: {
        envName: "production",
      },
    },
  },
}

export default FxhashConfig