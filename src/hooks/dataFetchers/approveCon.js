import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { controlAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";
export const ApproveCon =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.ControlAbi;
    const contract = controlAbi(contractAddress,web3);
    const buyHydtCon = useCallback (
        async(spendBnb) =>{
            console.log("aaaaaaaaaa",spendBnb);
            let val = web3.utils.toWei(spendBnb.toString(), "ether");
            console.log("11111111",val);
            try {
                const gas = await contract.methods.initialMint().estimateGas({from:account,value:val})
                const balance = await contract.methods.initialMint().send({from:account,value:val,gas})
                console.log('00000000000', balance);
                return balance
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { buyHydtCon: buyHydtCon };
}
export default ApproveCon;