import { quote } from "./libs/quote";

async function setPrice(priceTarget: number, startInput: number) {
  const {amountIn, amountOut, price} =  await quote(startInput);
    let priceCurrent = price;
    let amountInTarget = amountIn;
    let amountOutTarge = amountOut;
  
    while (priceCurrent <= priceTarget) {
      console.log("priceCurrent: " + priceCurrent + " priceTarget: " + priceTarget, "startInput: " + startInput);
      startInput = startInput + 100000
      const {amountIn, amountOut, price} =  await quote(startInput++);
      priceCurrent = price;
      amountInTarget = amountIn;
      amountOutTarge = amountOut;

      console.log(`price: ${priceCurrent}, amountIn: ${amountInTarget}, amountOut: ${amountOut}`)
    }
    const result = { 
      amountIn: amountInTarget,
      amountOut: amountOutTarge,
      price: priceTarget
    }
    return result
  
}

;(async () => {
  const res = await setPrice(1880, 10000)
  console.log(res);
})()

