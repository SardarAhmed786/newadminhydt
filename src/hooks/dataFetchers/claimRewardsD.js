import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { earnAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const ClaimRewardsD =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;
    const contract = earnAbi(contractAddress,web3);
    const dashRewards = useCallback (
        async() =>{
            try {
                if(account){
                const balance = await contract.methods.getPayoutBatch(account).call()
                return web3.utils.fromWei(balance, "ether");
                }
            }
             catch (error) {
                console.log('9999999', error);
                throw error;
            }
        },[contract]
    );
    return { dashRewards: dashRewards };
}
export default ClaimRewardsD;