
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { hydtAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";


export const HydtAllowance =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.HydtAbi;
    const contract = hydtAbi(contractAddress,web3);
    const AllowanceHydt = useCallback (
        async() =>{
            // let val = web3.utils.toWei(spendBnb.toString(), "ether");
            try {
                const balance = await contract.methods.allowance(account,Environment.EarnAbi).call()
                let bal = web3.utils.fromWei(balance, "ether")
                return bal;
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { AllowanceHydt: AllowanceHydt };
}
export default HydtAllowance;

