from web3 import Web3
from constants import POOL_FACTORY_CONTRACT_ADDRESS
from UniV2Abi import FactoryAbi


def get_pool_address(tokenA, tokenB, feeAmount):
    provider = Web3.HTTPProvider("https://eth.merkle.io")
    w3 = Web3(provider)
    f = w3.eth.contract(address=POOL_FACTORY_CONTRACT_ADDRESS, abi=FactoryAbi)
    addr = f.caller.getPool(tokenA, tokenB, feeAmount)
    return addr
