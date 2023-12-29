import web3NoAccount from './web3'
import yfEthAbi from './yfethAbi.json';
import ControlAbi from './ControlAbi.json';
import HydtAbi from './HydtAbi.json';
import FarmAbi from "./FarmAbi.json";
import LpTokenAbi from "../utils/LpTokenAbi.json";
import ControlResolverAbi from "./ControlResolverAbi.json";
import EarnAbi from "./EarnAbi.json";
import HygtAbi from "./HygtAbi.json";
import ReserveAbi from "./ReserveAbi.json";
import RouterUniswap from "./RouterUniswap.json";
import ShydtAbi from "./ShydtAbi.json";
import ReservesContract from "./ReservesContract.json";
import QuoteContract from "./QuoteContract.json";


const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
    return new _web3.eth.Contract(abi, address)
}

export const controlAbi = (address,web3) =>{
    return getContract(ControlAbi, address, web3)
}
export const hydtAbi = (address,web3) =>{
    return getContract(HydtAbi, address, web3)
}
export const farmAbi = (address,web3) =>{
    return getContract(FarmAbi, address, web3)
}
export const lpTokenAbi = (address,web3) =>{
    return getContract(LpTokenAbi, address, web3)
}
export const uniSwapRouter = (address,web3) =>{
    return getContract(RouterUniswap, address, web3)
}
export const controlResolverAbi = (address,web3) =>{
    return getContract(ControlResolverAbi, address, web3)
}
export const earnAbi = (address,web3) =>{
    return getContract(EarnAbi, address, web3)
}
export const hygtAbi = (address,web3) =>{
    return getContract(HygtAbi, address, web3)
}
export const reserveAbi = (address,web3) =>{
    return getContract(ReserveAbi, address, web3)
}
export const shydtAbi = (address,web3) =>{
    return getContract(ShydtAbi, address, web3)
}

export const reservesCont = (address,web3) =>{
    return getContract(ReservesContract, address, web3)
}
export const quoteCont = (address,web3) =>{
    return getContract(QuoteContract, address, web3)
}
// getReserves & quote for initial mint
export const getBep20Contract = (address, web3) => {
    return getContract(yfEthAbi, address, web3)
}