import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { earnAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const GetPendingHydt =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;
    const contract = earnAbi(contractAddress,web3);
    const PendingHydt = useCallback (
        async(index) =>{
            try {
                if(account && index){
                const balance = await contract.methods.getPayout(account,index).call()
                console.log("getPayoutgetPayout",balance,index);
                const bal = web3.utils.fromWei(balance, "ether");
                console.log("getPayoutgetPayout111",bal);
                return bal;
                }
            }
             catch (error) {
                console.log('9999999', error);
                throw error;
            }
        },[contract]
    );
    return { PendingHydt: PendingHydt };
}
export default GetPendingHydt;

