import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "../../utils/environment";
import {farmAbi} from "../../utils/contractHelpers"

export const PoolLength =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.FarmAbi;
    const contract = farmAbi(contractAddress,web3);
    const poolsLength = useCallback (
        async() =>{
            try {
                const balance = await contract.methods.poolLength().call()
                console.log("dddd",balance)
                return balance
            } catch (error) {
                console.log('uuuuuuuuuuuuuuuuu', error)
                throw error;
            }
        },[contract]
    );
    return { poolsLength: poolsLength };
}
export default PoolLength;
