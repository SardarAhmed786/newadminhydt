import React from "react";
import { useState, useEffect } from "react";
import "./initialmint.scss";
// import useEthBalance from "../../hooks/metamaskBal"
import { useWeb3React } from "@web3-react/core";
import CheckBalance from "../../hooks/dataFetchers/balanceOfHydt";
import GetCurrentPrice from "../../hooks/dataFetchers/getCurrentPrice";
import GetDailyMints from "../../hooks/dataFetchers/getDailyMints";
import useWeb3 from "../../hooks/useWeb3";
import ApproveCon from "../../hooks/dataFetchers/approveCon";
import Loader from "../../hooks/loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { controlResolverAbi } from "utils/contractHelpers";

const Initialmint = () => {
  const [timeshow, settimeshow] = useState(false);
  const { balanceOfHydt } = CheckBalance();
  const { currentPrice } = GetCurrentPrice();
  const { dailyMints } = GetDailyMints();
  const { buyHydtCon } = ApproveCon();
  // // console.log("difference we get here is ", timeshow)
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [balance1, setBalance] = useState(0);
  const [spendBnb, setSpendBnb] = useState("");
  const [maxBal, setMaxBal] = useState("");
  const web3 = useWeb3();
  const { account } = useWeb3React();
  const [hydtBalance, setHydtBalance] = useState("");
  const [currentBal, setCurrentBal] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [endTime, setEndTime] = useState("");
  const [approvee, setApprovee] = useState("");
  const [mainLoader, setMainLoader] = useState(false);

  function timer() {
    var time = new Date(endTime * 1000);
    var now = new Date();
    var diff = time.getTime() - now.getTime();

    if (diff <= 0) {
      settimeshow(true);
      if (sec && min == 0) {
        getDailyMints();
      }
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var mins = Math.floor(diff / (1000 * 60));
    var secs = Math.floor(diff / 1000);
    var d = days;
    var h = hours - days * 24;
    var m = mins - hours * 60;
    var s = secs - mins * 60;
    setDay(d);
    setHour(h);
    setMin(m);
    setSec(s);
  }
  // console.log("DDddd", hour, min, sec);

  setInterval(() => {
    timer();
  }, 1000);

  const checkBal = async () => {
    web3.eth.getAccounts(function (err, account) {
      account = account;
    });
    return web3.utils.fromWei(await web3.eth.getBalance(account), "ether");
  };
  // console.log("timeshoowowww", timeshow);
  // useEffect(() => {
  //   if ((min== 0  && sec == 0)) {
  //     // console.log("00000000011111111111");
  //     setTimeout(() => {
  //     // console.log("000000022222222222");
  //       getDailyMints();
  //       // if(endTime >=0){
  //       //   setInterval(() => {
  //       //     timer();
  //       //   }, 1000);
  //       // }
  //     }, 15000);

  //   }
  // }, [min== 0  && sec== 0 ]);

  // console.log("mintAmountmintAmount", mintAmount);
  useEffect(() => {
    if (account) {
      checkBal().then((res) => {
        setBalance(res);
      });
    }
  }, [account]);

  const getBalance = async () => {
    try {
      let result = await balanceOfHydt(account);
      setHydtBalance(result);
    } catch (error) { }
  };
  const CalMintAmount = () => {
    return ((mintAmount / 0.001) * 100).toFixed(2);
  };

  const getCurrBalance = async () => {
    try {
      let result = await currentPrice();
      // console.log("34343434334", result);
      setCurrentBal(result);
    } catch (error) {
      // console.log("222222", error);
    }
  };
  // console.log("55555555", approvee);

  const getDailyMints = async () => {
    try {
      // console.log("set gggggggggggggggg");
      let result = await dailyMints(account);
      setMintAmount(web3.utils.fromWei(result.amountUSD, "ether"));
      setEndTime(result.endTime);
      // console.log("44444", result.endTime);
    } catch (error) {
      // console.log("222222", error);
    }
  };
  // console.log("set gggggggggggggggg111111", endTime);
  const BuyHydt = async () => {
    if (spendBnb > 0) {
      if (spendBnb <= balance1) {
        setMainLoader(true);
        try {
          let result = await buyHydtCon(parseFloat(spendBnb).toFixed(18));
          setApprovee(result);
          if (result) {
            getDailyMints();
            setMainLoader(false);
            CalMintAmount();
            setSpendBnb("");
            setMaxBal("");
            getBalance("");
          }
          toast.success("Transaction Successfull", {
            position: "top-right",
            autoClose: 2000,
          });
        }
        catch (error) {
          let a = error.message.slice(29, 47);
          // console.log("aaaaa", error.message.slice(0, 750))
          setMainLoader(false);
          toast.error(a?.includes('transaction') ? 'User Denied Transaction' : a?.includes('price') ? 'Insufficient funds for gas' : a, {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } else {
        toast.info('Amount exceeds current balance!', {
          position: "top-right",
          autoClose: 3000,
        })
      }
    } else {
      toast.info('Input value must be greater than zero!', {
        position: "top-right",
        autoClose: 2000,
      })
    }
  };
  const hanHydt = async (e) => {
    if (currentBal) {
      // console.log("11111", e.target.value, currentBal, e.target.value / currentBal);
      setMaxBal(e.target.value);
      const val = (e.target.value / currentBal);
      let userBalac = await financial(val);
      setSpendBnb(userBalac);
    }
  };
  const hanBnb = async (e) => {
    // console.log("e.target.value/currentBal", e.target.value, currentBal)
    if (currentBal) {
      setSpendBnb(e.target.value);
      let userBalac = await financial(e.target.value * currentBal);
      setMaxBal(userBalac);
    }
  };

  const financial = async (bal) => {
    return Number.parseFloat(bal).toFixed(18)
  }
  // let abc = (per * userBal) / 100;
  //       // console.log("abc11111", abc);
  //       let userBalac = await financial(abc);
  useEffect(() => {
    if (account) {
      getBalance();
      getCurrBalance();
      getDailyMints();
    }
  }, [account]);

  // console.log("spendBnb", hydtBalance);
  return (
    <>
      {mainLoader && <Loader />}
      <section className="main-initialmint">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-12 p-0">
              <div className="main-head">
                <h3>Initial Mint</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-12 col-12 pr-0 padd-sm">
              <div className="main-card">
                <div className="minthyd">
                  <h3>Mint HYDT</h3>
                </div>
                <div className="main-parent">
                  <div className="parent">
                    <div className="left">
                      <h4>Spend</h4>
                    </div>
                    <div className="right">
                      <h4>
                        {balance1 != 0 ? parseFloat(balance1)?.toFixed(3) : 0} <span>:Balance</span>
                      </h4>
                    </div>
                  </div>
                  <div className="filedinput">
                    <img
                      src="\Coin_Iconss.svg"
                      alt="img"
                      className="icon-inner-input"
                    />
                    <input
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => hanBnb(e)}
                      value={spendBnb}
                    // min={0}
                    // maxlength ={19}
                    // max={balance1 !=0 && parseFloat(balance1).toFixed(2)}
                    />
                    <div className="buttonmax" onClick={() => { setSpendBnb(balance1); setMaxBal(balance1 * currentBal); }}>
                      <button>MAX</button>
                    </div>
                  </div>
                  <div className="parent">
                    <div className="left">
                      <h4>Receive</h4>
                    </div>
                    <div className="right">
                      <h4>
                        {hydtBalance ? parseFloat(hydtBalance).toFixed(5) : 0} <span>:Balance</span>
                      </h4>
                    </div>
                  </div>
                  <div className="filedinput">
                    <input type="number" placeholder="0.00" value={maxBal} onChange={(e) => hanHydt(e)} />
                    <img
                      src="\Coin_Icons.svg"
                      alt="img"
                      className="img-fluid icon-inner-input"
                    />
                  </div>
                  {/* <div className="parent">
                    <div className="left">
                      <h5>Exchange Rate</h5>
                    </div>
                    <div className="right">
                      <h6>
                        1 <span>HYDT/BNB</span>
                      </h6>
                    </div>

                  </div> */}
                  <div className="parent">
                    <div className="left">
                      <h5>Exchange Rate</h5>
                    </div>
                    <div className="right">
                      <h6>
                        {currentBal ? parseFloat(currentBal).toFixed(2) : 0} <span>HYDT/BNB</span>
                      </h6>
                    </div>

                  </div>
                </div>
                <div className="buttonapprove">
                  <button onClick={BuyHydt}>Buy HYDT</button>
                </div>
                {/* <div className="img-end">
                  <img src="\elipis5.svg" alt="img" />
                </div> */}
              </div>
            </div>
            <div className="col-xl-8 col-md-12 col-12 padd-sm">
              <div className="cardmain">
                <div className="minlimit">
                  <h3>Daily Mint Limit</h3>
                </div>
                <div className="parentmain">
                  <div className="parent">
                    <div className="left">
                      <h4>Daily HYDT Initial mint allowance</h4>
                    </div>
                    <div className="right">
                      <h4>{mintAmount} / 0.001</h4>
                    </div>
                  </div>
                  <div className="main-progress">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: CalMintAmount() + "%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="heading">
                      <div className="left">
                        {" "}
                        <p>0%</p>
                      </div>
                      <div className="right">
                        <p>100%</p>
                      </div>
                    </div>
                    <div
                      className="progress24"
                      style={{ left: CalMintAmount() + "%" }}
                    >
                      <div className="box"></div>
                      <p>{CalMintAmount() + "%"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cardmain2">
                <div className="maincardhead">
                  <p>Daily Mint Limit Restart in</p>
                  <h4>
                    {hour ? hour : 0} : {min ? min : 0} : {sec ? sec : 0}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Initialmint;
