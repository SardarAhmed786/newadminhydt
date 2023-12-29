
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { earnAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const TotalReturns =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;
    const contract = earnAbi(contractAddress,web3);
    const returnHydt = useCallback (
        async(update) =>{
            try {
                const balance = await contract.methods.getYieldType(account,update).call();
                const bal = web3.utils.fromWei(balance, "ether");
                return bal;
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { returnHydt: returnHydt };
}
export default TotalReturns;

