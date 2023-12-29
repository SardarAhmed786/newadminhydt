import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "../../utils/environment";
import { farmAbi } from "../../utils/contractHelpers";
import { lpTokenAbi } from "../../utils/contractHelpers";

export const EnableContract = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  
  const approveContract = useCallback(
      async (pid, tokenContractAddress) => {
      console.log("pidpidpid", pid, tokenContractAddress);
      if (account && Environment.FarmAbi) {
        console.log("account && Environment.FarmAbi", account, Environment.FarmAbi)
        try {
          let value ="115792089237316195423570985008687907853269984665640564039457584007913129639935";
          const contract = lpTokenAbi(tokenContractAddress, web3);
          if (contract?.methods) {
            console.log("11111122222",Environment.FarmAbi,account);
            const balance = await contract.methods
              .approve(Environment.FarmAbi, value)
              .send({ from: account });
            console.log("bala", balance);
            return balance
          }
        } catch (error) {
          console.log("uuuuuuuuuuuuuuuuu", error);
          throw error;
        }
      }
    },
    [account]
  );
  return { approveContract: approveContract };
};
export default EnableContract;

// import { useCallback } from "react";
// import { useWeb3React } from "@web3-react/core";
// import useWeb3 from "../useWeb3";
// import Environment from "../../utils/environment";
// import {farmAbi} from "../../utils/contractHelpers"
// import {lpTokenAbi} from "../../utils/contractHelpers"

// export const EnableContract =()=>{
//     const {account} = useWeb3React();
//     const web3 = useWeb3();
//     const contractAddress = Environment.FarmAbi;
//     console.log("contractAddress",contractAddress);
//     const contract = farmAbi(contractAddress,web3);
//     const contract1 = lpTokenAbi(balance.lpToken,web3);

//     const approveContract = useCallback (
//         async(pid) =>{
//             // const balance = await contract.methods.poolInfo().call()
//             let inputenable = 2;
//             try {
//                 const balance = await contract.methods.poolInfo(inputenable).call();
//                 console.log("qqqqq",balance.lpToken);
//                 let value = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
//                 if(balance.lpToken){
//                 const contract1 = lpTokenAbi(balance.lpToken,web3);
//                 console.log("Environment.FarmAbi", balance.lpToken,Environment.FarmAbi,value);
//                 const balance1 = await contract1.methods.approve(Environment.FarmAbi,value ).send({from : account});
//                 console.log("bala",balance1);
//                 }
//                 // return balance1
//             } catch (error) {
//                 console.log('uuuuuuuuuuuuuuuuu', error)
//                 throw error;
//             }
//         },[contract]
//     );
//     return { approveContract: approveContract };
// }
// export default EnableContract;
