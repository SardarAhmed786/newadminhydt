import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { earnAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const DepositRewardsD1 =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;
    const contract = earnAbi(contractAddress,web3);
    const dashdepositd1 = useCallback (
        async() =>{
            try {
                const balance = await contract.methods.getDailyPayoutBatch(account).call() 
                console.log("balanace in wei", balance);
                return web3.utils.fromWei(balance, "ether");
            } catch (error) {
                console.log('uuuuuuuuuuuuuuuuu', error)
                throw error;
            }
        },[contract]
    );
    return { dashdepositd1: dashdepositd1 };
}

export default DepositRewardsD1;
