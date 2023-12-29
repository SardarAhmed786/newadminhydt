import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import Environment from "../../utils/environment";
import { farmAbi } from "../../utils/contractHelpers";
import { lpTokenAbi } from "../../utils/contractHelpers";
import {uniSwapRouter} from "../../utils/contractHelpers";
import BigNumber from "bignumber.js";

export const FarmsApy = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const contractAddress = Environment.FarmAbi;
  console.log("contractAddress", contractAddress);
  const contract = farmAbi(contractAddress, web3);
  const conAddressRouter = Environment.routerContract;
  // const [token0Price,setToken0Price] =useState(0);
  // const [token1Price,setToken1Price] =useState(0);

  const farmsPercent = useCallback(
    async (pid, token,totalAll) => {
    console.log("ssssssssdsfdfdffd",pid, token)
      try {
        let token0Price = 0;
        let token1Price = 0;
        
        const contractAddress1 = token;
        console.log("424242222", contractAddress1,pid);
        const contract1 = lpTokenAbi(contractAddress1, web3);
        
        const getToken0 = await contract1.methods.token0().call();
        console.log("4564564654564",getToken0,pid);

        const getToken1 = await contract1.methods.token1().call();
        console.log("getToken0getToken011",getToken1,pid);

        const contract2 = lpTokenAbi(getToken0, web3);
        const contract3 = lpTokenAbi(getToken1, web3);

        //balanceOf  token0
        const getBalOfToken0 = await contract2.methods.balanceOf(contractAddress1).call();
        const getBalOfToken00 = web3.utils.fromWei(getBalOfToken0, "ether"); 
        console.log("balanceOf 1111111123",getBalOfToken00,pid);

        //decimals token0
        const getDeciToken0 = await contract2.methods.decimals().call();
        console.log("1222222222211111111",getDeciToken0,pid);
        //Router input-0
        const routInput0 = 1 * (Math.pow(10, getDeciToken0));
//         let balance=1;
//         const routInput0 = (balance).multipliedBy(new BigNumber(10).pow(getDeciToken0)).toFixed()
// console.log("hererererer",routInput0);


        //balanceOf  token1
        const getBalOfToken1 = await contract3.methods.balanceOf(contractAddress1).call();
        const getBalOfToken11 = web3.utils.fromWei(getBalOfToken1, "ether"); 
        console.log("11111111111222222333333333",getBalOfToken11,pid);
        
        //decimals token1
        const getDeciToken1 = await contract3.methods.decimals().call();
        console.log("12222222222111111100000",getDeciToken1,pid);
        //Router input-1
        const routInput1 = 1 * (Math.pow(10, getDeciToken1));
        console.log("routInput1routInput1",routInput1);
        const wbnbContract = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
        if(wbnbContract == getToken0){
          console.log("iffffffffffff");
          console.log("qwqw",getToken0,wbnbContract)
          token0Price = 1;
        }
        else{
          try{
            console.log("elseeeeeeeeee");
          const path = [getToken0,wbnbContract];
          console.log("qwqw555555554444444",path,routInput0.toString(),pid);
          let amount = routInput0.toString();
          const routerContract = uniSwapRouter(conAddressRouter, web3);
          let getAmountsOut = await routerContract.methods.getAmountsOut(amount,path).call();
          token0Price = web3.utils.fromWei(getAmountsOut[1], "ether"); 
          console.log("54545454545",token0Price,pid);
          }
          catch(error){
            const path = [getToken0,getToken1, wbnbContract];
            console.log(
              "9856589565",
              path,
              routInput0.toString(),
              pid
            );
            let amount = routInput0.toString();
            const routerContract = uniSwapRouter(conAddressRouter, web3);
            let getAmountsOut = await routerContract.methods
              .getAmountsOut(amount, path)
              .call();
            token0Price = web3.utils.fromWei(getAmountsOut[2], "ether");
          }
        }

        if(wbnbContract == getToken1){
          console.log("1212122121212",getToken1,wbnbContract)
          token1Price = 1;
        }
        else{
          try{
          const path = [getToken1,wbnbContract];
          const routerContract = uniSwapRouter(conAddressRouter, web3);
          let amount = routInput1.toString();
          console.log("dsdsdd545645",amount,pid);
          let getAmountsOut = await routerContract.methods.getAmountsOut(amount,path).call();
          token1Price = web3.utils.fromWei(getAmountsOut[1], "ether"); 
          console.log("dsdsddsdcsd",token1Price);
          }
          catch{
            console.log("2222222555555666666");
            token0Price=0;
          }
        }


        const REWARD_PER_BLOCK = 2;
        const BLOCKS_PER_DAY = 7200;
        const BLOCKS_PER_YEAR = 2628000;

        //totalAllocPoint
        const totalAllocPoints = await contract.methods.totalAllocPoint().call();
        console.log("totalAllocPointtotalAllocPoint",totalAllocPoints)

        //allocWeightage
        const allocWeightage = totalAll / totalAllocPoints;
        console.log("allocWeightage",totalAll,"/",totalAllocPoints,"===",allocWeightage)
        //
        const rewardTokenQuote = 0.00331473546012118975977681155454;
        const totalRewardPricePerYear= rewardTokenQuote * REWARD_PER_BLOCK * BLOCKS_PER_YEAR * allocWeightage;
        console.log("totalRewardPricePerYear",totalRewardPricePerYear,pid)

        const totalLpDepFarmContract = await contract1.methods.balanceOf(contractAddress).call();
        const totalLpDepFarmCon = web3.utils.fromWei(totalLpDepFarmContract, "ether"); 
        console.log("11111111111222222",totalLpDepFarmCon,pid);

        //Reserves
        const Reserves = await contract1.methods.getReserves().call();
        console.log("lpTokenPricelpTokenPrice",Reserves);
        const reserve0 =  web3.utils.fromWei(Reserves?._reserve0, "ether");
        const reserve1 = web3.utils.fromWei(Reserves?._reserve1, "ether");

        //TotalSupply
        const TotalSupply = await contract1.methods.totalSupply().call();
        const TotalSupply1 = web3.utils.fromWei(TotalSupply, "ether");
        console.log("TotalSupply",TotalSupply1,pid);
        
        console.log("token0Pricetoken0Price",reserve0, reserve1 ,TotalSupply1,pid);
        const lpTokenPrice = ((token0Price * reserve0) + ((token1Price) *reserve1)) / TotalSupply1
        console.log("lpTokenPricelpTokenPrice1111",lpTokenPrice,pid);

        const secLast = totalLpDepFarmCon * lpTokenPrice;
        console.log("token0Pricetoken0Price2324234",token0Price,token1Price,pid)
        console.log("2222222222444444444444", totalLpDepFarmCon,lpTokenPrice,pid ,"=",secLast);
        const apy = (totalRewardPricePerYear/secLast)*100;
        console.log("apyapyapy",apy,totalRewardPricePerYear,pid);
        return apy;

      } catch (error) {
        console.log("uuuuuuuuuuuuuuuuu", error);
        console.log("2222222555555666666",pid)
        throw error;
      }
    },
    [contract]
  );
  return { farmsPercent: farmsPercent };
};
export default FarmsApy;