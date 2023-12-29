import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { controlAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const GetDailyMints =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.ControlAbi;
    const contract = controlAbi(contractAddress,web3);
    const dailyMints = useCallback (
        async() =>{
            try {
                const balance = await contract.methods.getDailyInitialMints().call()
                console.log('error balOf2222', balance)
                return balance
            } catch (error) {
                console.log('uuuuuuuuuuuuuuuuu', error)
                throw error;
            }
        },[contract]
    );
    return { dailyMints: dailyMints };
}
export default GetDailyMints;
