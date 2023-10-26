import { ethers } from 'ethers'
import { CurrentConfig } from '../config'
import { computePoolAddress } from '@uniswap/v3-sdk'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  USDC_TOKEN,
  WETH_TOKEN,
} from '../libs/constants'
import { getProvider } from '../libs/providers'
import { toReadableAmount, fromReadableAmount } from '../libs/conversion'
import { Token } from '@uniswap/sdk-core'

export async function quote(inputAmountNum: number, token0Ob: Token, token1Ob: Token): Promise<any> {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  )
  inputAmountNum = Number(inputAmountNum.toFixed(6))
  const poolConstants = await getPoolConstants(USDC_TOKEN, WETH_TOKEN)
  const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
    token0Ob.address,
    token1Ob.address,
    poolConstants.fee,
    fromReadableAmount(
      inputAmountNum,
      token0Ob.decimals
    ).toString(),
    0
  )
  const toReadableNum = toReadableAmount(
    quotedAmountOut,
    token1Ob.decimals
  )

  const amountIn = inputAmountNum
  const price = amountIn / Number(toReadableNum)
  return {
    amountIn: amountIn,
    amountOut: toReadableNum,
    price: price,
  }
}

async function getPoolConstants(inToken: Token, outToken: Token): Promise<{
  token0: string
  token1: string
  fee: number,
  pool: string,
}> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: inToken,
    tokenB: outToken,
    fee: CurrentConfig.tokens.poolFee,
  })

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
  )
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ])

  return {
    token0,
    token1,
    fee,
    pool: currentPoolAddress,
  }
}
