import { Token } from "@uniswap/sdk-core";
import { USDC_TOKEN, WETH_TOKEN } from "./libs/constants";
import { quote } from "./libs/quote";

async function setPrice(
  priceTarget: number, 
  startInput: number, 
  inToken: Token, 
  outToken: Token,
  zeroForOne: boolean,
  step: number
  ) {
    if (!zeroForOne) {
      const temp = inToken
      inToken = outToken
      outToken = temp
    }

  const {amountIn, amountOut, price} =  await quote(startInput, inToken, outToken);
    let priceCurrent = price;
    let amountInTarget = amountIn;
    let amountOutTarge = amountOut;
  
    console.log(`priceCurrent: ${priceCurrent}`)
    if(zeroForOne) {
      while (priceCurrent <= priceTarget) {
        console.log("priceCurrent: " + priceCurrent + " priceTarget: " + priceTarget, "startInput: " + startInput);
        startInput = startInput + step
        const {amountIn, amountOut, price} =  await quote(startInput, inToken, outToken);
        priceCurrent = price;
        amountInTarget = amountIn;
        amountOutTarge = amountOut;
  
        console.log(`price: ${priceCurrent}, amountIn: ${amountInTarget}, amountOut: ${amountOut}, eth/usd: ${priceCurrent}`)
      }
    }else {
      while (priceCurrent <= priceTarget) {
        console.log("priceCurrent: " + priceCurrent + " priceTarget: " + priceTarget, "startInput: " + startInput);
        startInput = startInput+ step
        const {amountIn, amountOut, price} =  await quote(startInput, inToken, outToken);
        priceCurrent = price;
        amountInTarget = amountIn;
        amountOutTarge = amountOut;
  
        console.log(`price: ${priceCurrent}, amountIn: ${amountInTarget}, amountOut: ${amountOut}, eth/usd: ${priceCurrent}`)
      }
    }
    
    const result = { 
      amountIn: amountInTarget,
      amountOut: amountOutTarge,
      price: priceTarget
    }


    return result
  
}

;(async () => {
  /**
   * 当价格为 1880usd/1eth 的时候卖点手里的ETH
   * 那么此时需要470000USDT才能够达到上述价位。
   */
  const res = await setPrice(1790, 10000,USDC_TOKEN, WETH_TOKEN, true, 10000)
  
  /**
   * 当价格是0.0006Eth/1usd 的时候才买入ETH
   * 那么此时需要eth 7900 都被卖出，才能够达到上述价位
   */
  // const res2 = await setPrice(0.0006, 100, USDC_TOKEN, WETH_TOKEN, false, 100)
})()

