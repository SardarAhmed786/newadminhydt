import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3"
import { reservesCont } from "../../utils/contractHelpers";
import { quoteCont } from "../../utils/contractHelpers";
import Environment from "../../utils/environment";

export const GetCurrentPrice = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const reservesAddress = Environment.reservesContract;
    const quoteAddress = Environment.quoteContract;
    // console.log("reservesAddress", reservesAddress, quoteAddress);
    const contract = reservesCont(reservesAddress, web3);
    const contract1 = quoteCont(quoteAddress, web3);
    const currentPrice = useCallback(
        async () => {
            try {
                const balance = await contract.methods.getReserves().call();
                // let val = web3.utils.fromWei(balance.toString(), "ether");
                // console.log("aaafffff",balance._reserve0,balance._reserve1);
                if (balance._reserve0 && balance._reserve1) {
                    const eth1 = "1000000000000000000";
                    const balance1 = await contract1.methods.quote(eth1, balance._reserve1, balance._reserve0).call();
                    let val = web3.utils.fromWei(balance1.toString(), "ether");
                    return val;
                }
            } catch (error) {
                // console.log('444444444', error)
                throw error;
            }
        }, [contract]
    );
    return { currentPrice: currentPrice };
}
export default GetCurrentPrice;
