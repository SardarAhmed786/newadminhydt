import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { earnAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const EarnFee =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;
    const contract = earnAbi(contractAddress,web3);
    const depositAmount = useCallback (
        async() =>{
            // let val = web3.utils.toWei(spendBnb.toString(), "ether");
            try {
                const balance = await contract.methods.depositFee().call()
                console.log('00000000000', balance);
                if(balance){
                return balance/10
                }
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { depositAmount: depositAmount };
}
export default EarnFee;

