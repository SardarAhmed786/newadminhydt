import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { hydtAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const CheckBalance =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.HydtAbi;
    const contract = hydtAbi(contractAddress,web3);
    const balanceOfHydt = useCallback (
        async() =>{
            try {
                const balance = await contract.methods.balanceOf(account).call()
                let bal = web3.utils.fromWei(balance, "ether")
                console.log("17502899733294004",bal)
                return bal;
            } catch (error) {
                console.log('uuuuuuuuuuuuuuuuu', error)
                throw error;
            }
        },[contract]
    );
    return { balanceOfHydt: balanceOfHydt };
}
export default CheckBalance;
