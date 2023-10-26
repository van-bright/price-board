# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```



## 运行获取报价程序

```js
yarn hardhat run scripts/pools.ts 
```

```js
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
  
```