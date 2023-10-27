from web3 import Web3
from constants import QUOTER_CONTRACT_ADDRESS
from UniV2Abi import QuoterAbi


def get_price(tokenA, tokenB, feeAmount, amountXIn, x):
    provider = Web3.HTTPProvider("https://eth.merkle.io")
    w3 = Web3(provider)
    q = w3.eth.contract(address=QUOTER_CONTRACT_ADDRESS, abi=QuoterAbi)
    p = q.caller.quoteExactInputSingle(tokenA, tokenB, feeAmount, amountXIn, x)
    return p


def get_quoter():
    provider = Web3.HTTPProvider("https://eth.merkle.io")
    w3 = Web3(provider)
    q = w3.eth.contract(address=QUOTER_CONTRACT_ADDRESS, abi=QuoterAbi)
    return q
