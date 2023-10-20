
const min_tick = -887272n;
const max_tick = 887272n;
const q96 = 2n ** 96n;
const eth = 10n ** 18n;

function logBigInt(num: bigint) {
  const numStr = num.toString();

  // Calculate the number of digits in the BigInt
  const numDigits = numStr.length;

  // Calculate the logarithm using the formula:
  // log(num) = log(m * 10^e) = e + log(m)
  const exponent = numDigits - 1;
  const mantissa = parseInt(numStr[0] + '.' + numStr.slice(1));

  // Apply the logarithm to the mantissa
  const logMantissa = Math.log(mantissa);

  // Calculate the final logarithm
  const logarithm = exponent + logMantissa;

  return logarithm;
}

function sqrtBigInt(value: bigint) {
  if (value < 0n) {
      throw 'square root of negative numbers is not supported'
  }

  if (value < 2n) {
      return value;
  }

  function newtonIteration(n: bigint, x0: bigint) {
      const x1 = ((n / x0) + x0) >> 1n;
      if (x0 === x1 || x0 === (x1 - 1n)) {
          return x0;
      }
      return newtonIteration(n, x1);
  }

  return newtonIteration(value, 1n);
}

export function price_to_tick(p: bigint) {
  return Math.floor(logBigInt(p) / Math.log(1.0001));
}

export function price_to_sqrtp(p: bigint) {
  return sqrtBigInt(p) * q96;
}

export function tick_tosqrtp(t: bigint) {
  return 10001n ** (t / 2n) / (1n ** (t / 2n - 4n));
}

export function liquidity0(amount: bigint, pa: bigint, pb: bigint) {
  if (pa > pb) {
      let t = pa;
      pa = pb;
      pb = t;
  }

  return (amount * pa * pb) / q96 / (pb - pa);
}

export function liquidity1(amount: bigint, pa:bigint, pb: bigint) {
  if (pa > pb) {
    let t = pa;
    pa = pb;
    pb = t;
  }

  return amount * q96 / (pb - pa);
}

// 计算当流动性为liq时, 将价格从pcurr买到ptarget, 需要投入的xtoken数量
// pcurr和ptarget都是 sqrt(p) 的值.
export function calc_amount_x(liq: bigint, ptarget: bigint, pcurr: bigint) {
  if (ptarget > pcurr) {
    let t = ptarget;
    ptarget = pcurr;
    pcurr = t;
  }
  return (liq * q96 * (pcurr - ptarget)) / pcurr / ptarget;
}
// 计算当流动性为liq时, 将价格从pcurr买到ptarget, 总共将获得的ytoken数量
export function calc_amount_y(liq: bigint, ptarget: bigint, pcurr: bigint) {
  if (ptarget > pcurr) {
    let t = ptarget;
    ptarget = pcurr;
    pcurr = t;
  }
  return liq * (pcurr - ptarget) / q96;
}

// 预估 输入xtoken, amount数量时, 价格走向
// @params xtoken token合约地址
// @parmas curSqrtPrice sqrt(y/x)
export function estimate_target_rice(xtoken: string, curSqrtPrice: bigint, xamountIn: bigint) {

}

// 列举当前每个tick的流动性和xtoken的价格
export function list_price_and_liquity(xtoken: string, tickIndexStart: bigint, tickIndexEnd: bigint) {

}

// 计算将xtoken的价格从currSqrtPrice买到targetSqrtPrice, 需要投入的amount X
export function estimate_invest_amount(xtoken: string, currSqrtPrice: bigint, targeSqrtPrice: bigint) {

}