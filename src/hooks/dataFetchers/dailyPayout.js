import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { earnAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const DailyPayout =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;
    const contract = earnAbi(contractAddress,web3);
    const payoutDaily = useCallback (
        async(update) =>{
            // let val = web3.utils.toWei(spendBnb.toString(), "ether");
            try {
                const balance = await contract.methods.dailyPayouts(update).call()
                console.log('222222', balance);
                return web3.utils.fromWei(balance, "ether");
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { payoutDaily: payoutDaily };
}
export default DailyPayout;