import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { USDC_TOKEN, WETH_TOKEN } from './libs/constants'

const mainnet =
  'https://eth-mainnet.g.alchemy.com/v2/J3nrMrL6Kv9xFTxpjhuL4TCeGyZT7wND'
// Inputs that configure this example to run
export interface ExampleConfig {
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    poolFee: number
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: mainnet,
  },
  tokens: {
    in: USDC_TOKEN,
    amountIn: 10000,
    out: WETH_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}
