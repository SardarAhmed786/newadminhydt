import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "../../utils/environment";
import { farmAbi } from "../../utils/contractHelpers";

export const GetPending = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddress = Environment.FarmAbi;
    console.log("contractAddress", contractAddress);
    const contract = farmAbi(contractAddress, web3);

    const pendingRewards = useCallback(async (pid, amount) => {
        try {
            console.log("1111111111", pid);
            const balance = await contract.methods.getPending(pid, account).call();
            return web3.utils.fromWei(balance, "ether");
        } catch (error) {
            console.log("uuuuuuuuuuuuuuuuu", error);
            throw error;
        }
    }, [contract]);
    return { pendingRewards: pendingRewards };
};
export default GetPending;
