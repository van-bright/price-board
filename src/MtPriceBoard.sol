// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.14;

contract MtPriceBoard {

    address public poolAddr;

    constructor(address _pool) {
        poolAddr = _pool;
    }
    /*
    * 查询买入限价单
    * 以现价为基础, 直到价格降低到预期价格toPrice. 即吃掉当前所有价格低于toPrice的挂单需要的投入.
    * @params toPrice 价格上限, 按 y/x 的价格计算
    * @returns
    *   minXin: 需要投入的X token数量
    *   maxYout: 将获得的最大的Y token数量
    */
    function quoteBuyLimitOrder(uint256 toPrice)
        public
        view
        returns(uint256 minXin, uint256 maxYout)
    {

    }

    /*
    * 查询投入指定的x数量, 价格将降至的区间
    *
    * @params xIn 投入的x的数量
    * @returns
    *   toPrice: 价格将降至的区间
    *   yOut: 将获得的最大的Y token数量
    */
    function quoteSellAmountOrder(uint256 xIn)
        public
        view
        returns(uint256 toPrice, uint256 yOut)
    {

    }

    /*
    * 查询指定价格区间变动时, 如fromPrice > toPrice, 表示卖出x, 否则表示买入x.
    * 计算方法(待验证):
    *   1. 通过价格计算出tick, 从fromTick到toTick, 然后计算出sqrtFromPrice和sqrtToPrice,
    *   2. 通过positon, 计算出跨tick的liquidity delta.
    *   3. 通过Math.calcAmount0Delta() 和 Math.calcAmount1Delta() 计算出x, y的改变数量
    */
    function quoteRangePrice(uint256 fromPrice, uint256 toPrice)
        public
        view
        returns(uint256 xIn, uint256 yOut)
    {

    }
}