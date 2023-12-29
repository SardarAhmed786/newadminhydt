import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { earnAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const GetPendingHygt =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;
    const contract = earnAbi(contractAddress,web3);
    const PendingHygt = useCallback (
        async(index) =>{
            // let lockP = "";
            // if (lockPeriod == "3")
            // {
            //     lockP =0;
            // }
            // if(lockPeriod == "6")
            // {
            //     lockP =1;
            // }
            // if(lockPeriod == "12")
            // {
            //     lockP =2;
            // }
            try {
                if( account && index){
                const balance = await contract.methods.getPending(account,index).call();
                const bal = web3.utils.fromWei(balance, "ether");
                return bal;
                }
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { PendingHygt: PendingHygt };
}
export default GetPendingHygt;
