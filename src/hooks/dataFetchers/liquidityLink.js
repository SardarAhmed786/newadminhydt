import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "../../utils/environment";
import { farmAbi } from "../../utils/contractHelpers";
import { lpTokenAbi } from "../../utils/contractHelpers";

export const LiquidityLink = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();

  const GetLiquidity = useCallback(
    async (lpToken) => {
      try {
        const contract = lpTokenAbi(lpToken, web3);
        const token1 = await contract.methods.token0().call();
        const token2 = await contract.methods.token1().call();
        const link =  `https://app.uniswap.org/#/add/v2/${token1}/${token2}`
        return link
      } catch (error) {
        console.log("uuuuuuuuuuuuuuuuu", error);
        throw error;
      }
    },
    []
  );
  return { GetLiquidity: GetLiquidity };
};
export default LiquidityLink;
