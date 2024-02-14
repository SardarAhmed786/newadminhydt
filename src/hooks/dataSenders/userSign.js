import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { getLibraryForSign } from "../../utils/web3React";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from 'web3';
export const Signature = () => {
    const { account } = useWeb3React()
    var library = null;
    if (account) {
        library = getLibraryForSign(Web3.givenProvider);
    } else {
    }
    const sign = useCallback(async (accountData) => {

        if ((library && account)) {
            let signing = library
                .getSigner(account);
            try {
                let signature = await signing.signMessage(
                    `${account}`
                );
                // toast.success(`${signature.substring(0, 6)}...${signature.substring(signature.length - 4)}`, {
                //   position: "top-right",
                //   autoClose: 2000
                // });
                return signature;
            }
            catch (error) {
                // console.log("error", error)
                toast.error('Signature Denied', {
                    position: "top-right",
                    autoClose: 2000
                });
            }
        }
    }, [account, library])
    return { userSign: sign }
}
export default Signature