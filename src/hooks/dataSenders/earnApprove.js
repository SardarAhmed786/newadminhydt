import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import Environment from "../../utils/environment";
import { hydtAbi } from "../../utils/contractHelpers";

export const EarnApprove =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.HydtAbi;
    const contract = hydtAbi(contractAddress,web3);
    let value = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    const approveEarn = useCallback (
        async() =>{
            try {
                const balance = await contract.methods.approve(Environment.EarnAbi,value).send({from:account})
                console.log('eeeeeeeeee', balance);
                return balance
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { approveEarn: approveEarn };
}
export default EarnApprove;
