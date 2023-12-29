import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { lpTokenAbi } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const BalanceOfLpTokens = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const BalanceLP = useCallback(
        async (pid,token) => {

            const contractAddress = token;
            const contract = lpTokenAbi(contractAddress, web3);
            try {
                const balance = await contract.methods.balanceOf(account).call()
                return web3.utils.fromWei(balance, "ether");
            } catch (error) {
                console.log('uuuuuuuuuuuuuuuuu', error)
                throw error;
            }
        }, [account]
    );
    return { BalanceLP: BalanceLP };
}
export default BalanceOfLpTokens;
