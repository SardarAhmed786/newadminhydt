import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "../../utils/environment";
import { farmAbi } from "../../utils/contractHelpers";

export const  ClaimRewardsD2 = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const contractAddress = Environment.FarmAbi;
  console.log("contractAddress", contractAddress);
  const contract = farmAbi(contractAddress, web3);

  const dashRewardsTwo = useCallback(async () => {
    try {
        if(account){
        const balance = await contract.methods.getPendingBatch(account).call();
        return web3.utils.fromWei(balance, "ether");
        }
    }
     catch (error) {
        console.log('9999999', error);
        throw error;
    }
  }, [contract]);
  return { dashRewardsTwo: dashRewardsTwo };
};
export default ClaimRewardsD2;
