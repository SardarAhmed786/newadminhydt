import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { controlAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const DepositRewardsD2 =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.ControlAbi;
    const contract = controlAbi(contractAddress,web3);
    const dashdepositd2 = useCallback (
        async() =>{
            try {
                const balance = await contract.methods.getCurrentPrice().call()
                return web3.utils.fromWei(balance, "ether");
            } catch (error) {
                console.log('uuuuuuuuuuuuuuuuu', error)
                throw error;
            }
        },[contract]
    );
    return { dashdepositd2: dashdepositd2 };
}
export default DepositRewardsD2;
