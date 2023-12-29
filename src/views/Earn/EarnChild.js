import React from 'react'
import PoolLength from "../../hooks/dataFetchers/poolLength";
import EnableContract from "../../hooks/dataSenders/enableContract";
import DepositToken from "../../hooks/dataSenders/depositToken";
import WithdrawToken from "../../hooks/dataSenders/withdrawToken";
import { useWeb3React } from "@web3-react/core";
import Environment from "../../utils/environment";
import BalanceOfLpTokens from "../../hooks/dataFetchers/balanceOfLpTokens";
import Loader from "../../hooks/loader";
import GetPending from "../../hooks/dataFetchers/getPending";
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from "../../hooks/dataFetchers/userInfo";
import AllowanceTokens from "../../hooks/dataFetchers/allowance";
import useWeb3 from "../../hooks/useWeb3";
import GetPendingHydt from "../../hooks/dataFetchers/getPendingHydt";
import GetPendingHygt from '../../hooks/dataFetchers/getPendingHygt';
import ClaimRewards from "../../hooks/dataSenders/claimRewards";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

function EarnChild({getDepositData, item, dateTime, endTime, distanceToDate,progress,getBalance,HydtAllow111 }) {
    const { account } = useWeb3React();
    const [mainLoader, setMainLoader] = useState(false);
    const [pendHydt, setPendingHydt] = useState("");
    const [pendHygt, setPendingHygt] = useState("");
    const { PendingHydt } = GetPendingHydt();
    const { PendingHygt } = GetPendingHygt();
    const [addCls, setcls] = useState(false);
    const { depositRewards } = ClaimRewards();
    console.log(
        "111111222222222111133333333331",
        distanceToDate
      );
    const web3 = useWeb3();
    const handlePendingHydt = async (index) => {
        console.log("90909090", index)

        if (index) {
            try {
                setMainLoader(true);
                let result = await PendingHydt(index);
                setPendingHydt(result);
                setMainLoader(false);
            }
            catch {
                setMainLoader(false);
            }
        }
    };
    const hanDepositRew = async (lockP, index) => {
        console.log("9090800000", lockP, index)
        if (index) {
            try {
                setMainLoader(true);
                let result = await depositRewards(index);
                if (result && lockP && index) {
                    setTimeout(() => {
                        handlePendingHydt(index);
                        handlePendingHygt(index);
                        getDepositData();
                        getBalance();
                        HydtAllow111();
                    }, 4000);
                }
                setMainLoader(false);
                toast.success("Claimed Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                  });
            }
            catch {
                // console.log("55555555",error)
                setMainLoader(false);
            }
        }
    };

    const handlePendingHygt = async (index) => {
        // console.log("lockPeriodlockPeriod", lockPeriod, index)
        console.log("90909191",index)

        if (index) {
            try {
                setMainLoader(true);
                let result = await PendingHygt( index);
                console.log("90909191", result)
                setPendingHygt(result);
                setMainLoader(false);
            }
            catch {
                setMainLoader(false);
            }
        }
    };
    useEffect(() => {
        if (account) {
            // handlePendingHydt(item?.lockPeriod, account, item?.index);
            // handlePendingHygt();
        }
    }, [account]);
    const WithLabelExample = (pro)=> {
        return <ProgressBar now={pro}  />;
      }
    return (
        <>
            {mainLoader && <Loader />}
            {console.log("pidpidpidpid", item)}
            <div className="rowsss">
                <div className="bottom-content1">
                    <div className="bottom-content ">
                        <div className="itemss">
                            <h6>Time of deposit</h6>
                            <h5>{dateTime}</h5>
                            
                        </div>
                        
                        <div className="itemss">
                            <h6>Lock Period</h6>
                            <h5>{item?.lockPeriod} Months</h5>
                        </div>
                        <div className="itemss">
                            <h6>Deposit Amount</h6>
                            <h5>
                                {item?.amount ? parseFloat(web3.utils.fromWei(item?.amount, "ether")).toFixed(6) : 0}{" "}
                                <span>
                                    HYDT{" "}
                                    <img
                                        src="\assests\buttonsvgs\hydt.svg"
                                        alt="img"
                                        className="img-fluid ml-2x"
                                    />
                                </span>
                            </h5>
                        </div>
                        <div className="itemss">
                            <h6>APY</h6>
                            <h5>{item?.lockPeriod == "3" ? "16%" : item?.lockPeriod == "6" ? "20%" : item?.lockPeriod == "12" ? "30%" : ""}</h5>
                        </div>
                        <div className="itemss itemss-sm" onClick={() => { handlePendingHydt(item?.index); handlePendingHygt( item?.index) }}>
                            <a
                                class="hide-btn"
                                data-toggle="collapse"
                                href={`#collapseExample${item?.index}`}
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                            // onClick={() => setcls(!addCls)}
                            >
                                <button className='sytvcstsc'> <span className="dt">Detail</span>{" "}</button>
                                <span className="hid">Hide</span>{" "}
                                <img
                                    src="\assests\buttonsvgs\arrow-down.svg"
                                    alt="img"
                                    className="img-fluid ml-2x"
                                />
                            </a>
                        </div>
                    </div>
                    <div class="collapse" id={`collapseExample${item?.index}`}>
                        <div className="bottom-content bottom-content2">
                            <div className="itemss">
                                <h6>Date of Maturity</h6>
                                <h5>{endTime}</h5>
                                <p className='proBar'>{WithLabelExample(progress > 0 && progress <= 100 ? progress : 100 )}</p>
                            </div>
                            <div className="itemss">
                                <h6>Pending Rewards</h6>
                                <h5>
                                    {pendHydt ? parseFloat(pendHydt).toFixed(6) : 0}{" "}
                                    <span>
                                        HYDT{" "}
                                        <img
                                            src="\assests\buttonsvgs\hydt.svg"
                                            alt="img"
                                            className="img-fluid ml-2x"
                                        />
                                    </span>
                                </h5>
                            </div>
                            <div className="itemss">
                                <h6>Pending Rewards</h6>
                                <h5>
                                    { pendHygt ? parseFloat(pendHygt).toFixed(6) : 0}{" "}
                                    <span>
                                        HYGT{" "}
                                        <img
                                            src="\assests\buttonsvgs\hygt.svg"
                                            alt="img"
                                            className="img-fluid ml-2x"
                                        />
                                    </span>
                                </h5>
                            </div>
                            {
                            // distanceToDate >= 0 || 
                            pendHydt < 0 &&  pendHygt < 0 && item?.status == false ?
                                <div className="itemss">
                                    <button
                                        className="btn-transparent btn-disable"
                                        disabled
                                    >
                                        Claim
                                    </button>
                                </div>
                                :
                                <div className="itemss">
                                    <button
                                        className="btn-transparent "
                                        onClick={() => hanDepositRew(item?.lockPeriod, item?.index)}
                                    >
                                        Claim
                                    </button>
                                </div>}

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
export default EarnChild

