import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "../../utils/environment";
import { farmAbi } from "../../utils/contractHelpers";

export const WithdrawToken = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.FarmAbi;
    console.log("contractAddress", contractAddress);
    const contract = farmAbi(contractAddress, web3);

    const UnstakeContract = useCallback(
        async (pid, reward) => {
            try {
                console.log("ttttttttttttt", web3.utils.toWei(reward.toString(), "ether"));
                if (parseFloat(reward) === 0) {
                    const balance = await contract.methods.withdrawRewards(pid).send({ from: account });
                    console.log("balabala", balance);
                    return balance
                } else {
                    const balance = await contract.methods.withdraw(pid, reward).send({ from: account });
                    console.log("balabala", balance);
                    return balance
                }

            }
            catch (error) {
                console.log('uuuuuuuuuuuuuuuuu', error)
                throw error;
            }
        }, [contract]
    );
    return { UnstakeContract: UnstakeContract };
}
export default WithdrawToken;

