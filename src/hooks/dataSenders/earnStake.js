import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import Environment from "../../utils/environment";
import { earnAbi } from "../../utils/contractHelpers";

export const EarnStake =()=>{
    const {account} = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.EarnAbi;    
    const contract = earnAbi(contractAddress,web3);
    let value = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    const stakeEarn = useCallback (
        async(hydtAmount,stakeType) =>{
            try {
                console.log("ddddddddddd",hydtAmount);
                let bal = web3.utils.toWei(hydtAmount.toString(), "ether");
                console.log("ddddd11111",bal);
                const balance = await contract.methods.stake(bal,stakeType).send({from:account})
                console.log('555555555', balance);
                return balance
            } catch (error) {
                console.log('9999999', error)
                throw error;
            }
        },[contract]
    );
    return { stakeEarn: stakeEarn };
}
export default EarnStake;