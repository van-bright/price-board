# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

import algo
from quoter import get_quoter
from constants import WETH_TOKEN, USDC_TOKEN, FeeAmount_Medium


one_eth = 10**18
one_usdc = 10**6


def sell_order_quote(token_in, token_out, fee, price_decrease):
    """
    卖盘报价: 按指定的价格下降数量, 预估流动性
    :param token_in: 投入的token
    :param token_out: 获得的token
    :param fee: 可接受的费率
    :param price_decrease: 价格下降大小
    :return:
    """
    quoter = get_quoter()
    # 第一步, 拿到当前的报价
    curr_price = quoter.caller.quoteExactInputSingle(token_in, token_out, fee, one_eth, 0)
    print(f"current price: {curr_price}")

    # 第二步, 设置预期的价格
    # 因为我们是要卖出ETH. 池子中ETH会增加, 意味着价格会下降, 所以目标卖出价要比当前价格低.
    target_sell_price = algo.price_to_sqrtp(curr_price - price_decrease)  # sell eth make price decrease 300U

    # 第三步, 使用一个足够大的input, 将目标价格以上的流动性全部买光, 那么计算得到的结果将是最大的可用流动性.
    max_input = 100000000 * one_eth
    max_output = quoter.caller.quoteExactInputSingle(token_in, token_out, fee, max_input, target_sell_price)
    print(f"max liquidity for output: {max_output}")

    # 第四步, 使用max_output, 反向预估
    amount_in = quoter.caller.quoteExactOutputSingle(token_in, token_out, fee, max_output, target_sell_price)
    print(f"estimate buy-able liquidity: {amount_in/one_eth}")


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    sell_order_quote(WETH_TOKEN, USDC_TOKEN, FeeAmount_Medium, 100*one_usdc)
# See PyCharm help at https://www.jetbrains.com/help/pycharm/
