import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { earnAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const ClaimRewards =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;
    const contract = earnAbi(contractAddress,web3);
    const depositRewards = useCallback (
        async(index) =>{
            try {
                if(index){
                const balance = await contract.methods.claimPayout(index).send({from:account})
                return balance;
                console.log('uuuuu', balance);
                }
            }
             catch (error) {
                console.log('9999999', error);
                throw error;
            }
        },[contract]
    );
    return { depositRewards: depositRewards };
}
export default ClaimRewards;

