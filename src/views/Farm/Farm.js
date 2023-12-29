import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import './farm.scss';
import PoolLength from "../../hooks/dataFetchers/poolLength";
import EnableContract from "../../hooks/dataSenders/enableContract";
import DepositToken from "../../hooks/dataSenders/depositToken";
import WithdrawToken from "../../hooks/dataSenders/withdrawToken";
import { useWeb3React } from "@web3-react/core";
import Environment from "../../utils/environment";
import BalanceOfLpTokens from "../../hooks/dataFetchers/balanceOfLpTokens";
import Loader from "../../hooks/loader";
import GetPending from "../../hooks/dataFetchers/getPending";
import FarmChild from './FarmChild';

const Farm = () => {
    const [leng, setLeng] = useState([]);
    const { poolsLength } = PoolLength();
    const [mainLoader, setMainLoader] = useState(false);
    const { account } = useWeb3React();

    const PoolLen = async () => {
        let result = await poolsLength();
        if (result > 0) {
            let arr = Array.from(Array(parseInt(result)).keys());
            setLeng(arr);
        }
    };
    const getDepositData = () => {
        // setLoader(true)
        var data = JSON.stringify({
            query: `query 
      MyQuery {addPools (where: {allocPoint_gt: "0"} orderBy: pid, orderDirection: asc){
    lpToken
    pid
    symbol
    allocPoint
  }
      }`
        });

        var config = {
            method: "post",
            url: Environment.hydtGraph,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                console.log("kkkkkkkk", response?.data?.data?.addPools);
                setLeng(response?.data?.data?.addPools);
            })
            .catch(function (error) {
                // setLoader(false)
            });
    };

    useEffect(() => {
        // if (account) {
        getDepositData();
        // }
    }, [account]);
    return (
        <>
            {mainLoader && <Loader />}
            <div className="content">
                <section className="farm">
                    <div className="container-fluid p-0">
                        <div className="row">
                            <h3 className='farmhead'>Farm</h3>
                            {leng?.map((item) => {
                                return (
                                    item?.symbol && item?.pid && item?.lpToken &&
                                    <FarmChild item={item} setMainLoader={setMainLoader} mainLoader={mainLoader} />
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>

            {/* <div class="btn btn-primary mb-4" data-toggle="modal" data-target="#exampleModal">hhhh</div>
            <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">augxyayufaxfyux</button> */}


        </>
    )
}

export default Farm