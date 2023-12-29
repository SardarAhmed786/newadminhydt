import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "../../utils/environment";
import { farmAbi } from "../../utils/contractHelpers";

export const DepositToken = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const contractAddress = Environment.FarmAbi;
  console.log("contractAddress", contractAddress);
  const contract = farmAbi(contractAddress, web3);
  const StakeContract = useCallback(async (pid,amount) => {
    let stakeAmount = web3.utils.toWei(amount.toString(), "ether");
    
    try {
      console.log("pidpid",pid,amount,stakeAmount);
      const balance = await contract.methods.deposit(pid,stakeAmount).send({from:account});
      console.log("qqqqq", balance);
    return balance
    } catch (error) {
      console.log("uuuuuuuuuuuuuuuuu", error);
      throw error;
    }
  }, [contract]);
  return { StakeContract: StakeContract };
};
export default DepositToken;
