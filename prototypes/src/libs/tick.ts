import { ethers } from 'ethers'
import { CurrentConfig } from '../config'
import { computePoolAddress } from '@uniswap/v3-sdk'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
} from './constants'
import { getProvider } from './provider'

// // Connect to the Uniswap v3 pool contract
// const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
// const poolContract = new ethers.Contract('UNISWAP_V3_POOL_ADDRESS', UNISWAP_V3_ABI, provider);

async function getPoolContract() {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  })

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
  )

  return poolContract;
}
// Get the liquidity of each tick
async function getTicksLiquidity() {
  const poolContract = await getPoolContract();
  const slot0 = await  poolContract.slot0();
  console.log(`slot0: ${slot0}`)
  // 计算slot中的y的价格
  const q96 = 2n**96n;
  const price = ethers.formatEther((slot0[0] / q96) ** 2n)
  console.log(`price: ${price}`)

  const tickSpacing = await poolContract.tickSpacing();
  console.log(`tick spaceing: ${tickSpacing}`);
  // const currentTick = await poolContract.currentTick();
  const currentTick = slot0[1];
  const tickBitmap = await poolContract.tickBitmap(currentTick / tickSpacing);

  const ticksLiquidity = [];

  console.log(`tickBitmap.length:  ${tickBitmap.length}`);

  // for (let i = tickBitmap.length - 1; i >= 0; i--) {
  //   if (tickBitmap[i]) {
  //     const tickIndex = (i * tickSpacing).toString();
  //     const tickData = await poolContract.ticks(tickIndex);

  //     const liquidityGross = tickData.liquidityGross.toString();
  //     const liquidityNet = tickData.liquidityNet.toString();

  //     ticksLiquidity.push({ index: tickIndex, liquidityGross, liquidityNet });
  //   }
  // }

  // return ticksLiquidity;
}

getTicksLiquidity();
// Usage
// getTicksLiquidity()
//   .then((ticksLiquidity) => {
//     console.log(ticksLiquidity);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
