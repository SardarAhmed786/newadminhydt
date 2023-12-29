import React from "react";
import PoolLength from "../../hooks/dataFetchers/poolLength";
import EnableContract from "../../hooks/dataSenders/enableContract";
import DepositToken from "../../hooks/dataSenders/depositToken";
import WithdrawToken from "../../hooks/dataSenders/withdrawToken";
import { useWeb3React } from "@web3-react/core";
import Environment from "../../utils/environment";
import BalanceOfLpTokens from "../../hooks/dataFetchers/balanceOfLpTokens";
import Loader from "../../hooks/loader";
import GetPending from "../../hooks/dataFetchers/getPending";
import { useState, useEffect } from "react";
import axios from "axios";
import UserInfo from "../../hooks/dataFetchers/userInfo";
import AllowanceTokens from "../../hooks/dataFetchers/allowance";
import useWeb3 from "../../hooks/useWeb3";
import LiquidityLink from "../../hooks/dataFetchers/liquidityLink";
import FarmsApy from "../../hooks/dataFetchers/farmsApy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FarmChild({ item, setMainLoader, mainLoader }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("7777777777", item);
  const { approveContract } = EnableContract();
  const { BalanceLP } = BalanceOfLpTokens();
  const { StakeContract } = DepositToken();
  const { UnstakeContract } = WithdrawToken();
  const { pendingRewards } = GetPending();
  const { balanceInfo } = UserInfo();
  const { allowanceBal } = AllowanceTokens();
  const { GetLiquidity } = LiquidityLink();
  const { farmsPercent } = FarmsApy();

  const { account } = useWeb3React();
  const [showunstake, setShowunstake] = useState(false);
  const handleCloseunstake = () => setShowunstake(false);
  const handleShowunstake = () => setShowunstake(true);
  const [approv, setApprov] = useState("");
  const [stake, setStake] = useState("");
  const [unstake, setUnstake] = useState("");
  const [percen, setPercentStake] = useState(0);
  const [percenUnS, setPercentUS] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [stakeLpBal, setStakeLpBal] = useState("");
  const [liqLink, setLiqLink] = useState("");
  const [hydtBalance, setHydtBalance] = useState(0);
  const [unStakeLpBal, setUnStakeLpBal] = useState("");
  const [rewards, setRewards] = useState("");
  const [userBal, setUserBal] = useState("");
  const [allowance, setAllowance] = useState("");
  const [perecntFarms, setPerecntFarms] = useState("");

  const web3 = useWeb3();
  let vall = 0.55555555555555555555555;
  let chkVal = web3.utils.toWei(vall.toString(), "ether")
  console.log("vallvall", chkVal);
  const PendingRew = async (pid) => {
    console.log("rewardsrewardsrewardsrewards", pid);
    try {
      let result = await pendingRewards(pid);
      setRewards(result);
    } catch {
      setMainLoader(false);
    }
  };
  const UserBalance = async (pid) => {
    try {
      let result = await balanceInfo(pid);
      setUserBal(result);
      setMainLoader(false);
    } catch {
      setMainLoader(false);
    }
  };
  const HanFarms = async (pid, token, totalAlloc) => {
    try {
      setMainLoader(true);
      let result = await farmsPercent(pid, token, totalAlloc);
      console.log("result122222", result);
      let perce = "";
      if (result === Infinity) {
        setPerecntFarms(0);
      }
      else {
        setPerecntFarms(result);
      }
      setMainLoader(false);
    } catch {
      setMainLoader(false);
    }
  };
  console.log("perecntFarmsperecntFarms", perecntFarms);
  const AllowanceLP = async (pid, token) => {
    try {
      let result = await allowanceBal(pid, token);
      setAllowance(result);
      setMainLoader(false);
    } catch {
      setMainLoader(false);
    }
  };

  console.log("userBaluserBal", unStakeLpBal);

  const handleStakeP = async (per) => {
    setPercentStake(per);
    if (tokenBalance != 0) {
      if (per == "Max") {
        setStakeLpBal(tokenBalance);
      } else {
        let abc = (per * tokenBalance) / 100;
        let userBalac = await financial(abc);
        setStakeLpBal(userBalac);
        console.log("abc", abc);
      }
    }
  };

  console.log("userBaluserBal");
  const handleUnStake = async (per) => {
    setPercentUS(per);
    if (userBal != 0) {
      console.log("ssssss", userBal, per);
      if (per == "Max") {
        setUnStakeLpBal(userBal);
      } else {
        let abc = (per * userBal) / 100;
        let userBalac = Number.parseFloat(abc).toFixed(18);
        console.log("dfcdcd222", userBalac);
        setUnStakeLpBal(userBalac);
      }
    }
  };
  console.log("324rgdf43", unStakeLpBal);

  const financial = async (bal) => {
    return Number.parseFloat(bal).toFixed(18)
  }
  console.log("unStakeLpBalunStakeLpBal", unStakeLpBal);
  const ApproveFun = async (pid, lpToken) => {
    if (!account) {
      toast.info('Connect Your Wallet', {
        position: "top-right",
        autoClose: 2000,
      })
      return
    }
    console.log("pid", pid, lpToken);
    if ((pid, lpToken)) {
      try {
        setMainLoader(true);
        let result = await approveContract(pid, lpToken);
        // if (result) {
        AllowanceLP(item?.pid, item?.lpToken);
        setMainLoader(false);
        toast.success("Contract Enabled Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        // }
        setMainLoader(false);
      } catch (error) {
        let a = error.message.slice(29, 47);
        toast.error(a?.includes('transaction') ? 'User Denied Transaction' : error, {
          position: "top-right",
          autoClose: 2000,
        });
        setMainLoader(false);

      }
    }
  };
  const BalanceOfLP = async (pid, token) => {
    console.log("iiiiiii", pid, token);
    let result = await BalanceLP(pid, token);
    if (result) {
      HanFarms(item?.pid, item?.lpToken, item?.allocPoint)
    }
    setTokenBalance(result);
  };
  const harvestReward = async (pid, reward) => {
    // let rewardBal = web3.utils.toWei(reward, "ether");
    console.log("rewardsrewards", pid, reward);
    // reward > 0
    if (reward > 0) {
      try {
        setMainLoader(true);
        let result = await UnstakeContract(pid, 0);
        if (result) {
          PendingRew(item?.pid);

        }
        setMainLoader(false);
        toast.success("Harvested Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      } catch (error) {
        let a = error.message.slice(29, 47);
        toast.error(a?.includes('transaction') ? 'User Denied Transaction' : error, {
          position: "top-right",
          autoClose: 2000,
        });
        setMainLoader(false);
      }
    } else {
      toast.info('Reward is insufficient', {
        position: "top-right",
        autoClose: 2000,
      })
    }
    // console.log("iiiiiii", pid, token);
    // setTokenBalance(result);
  };
  const StakeTokens = async (pid) => {
    if (stakeLpBal > 0) {
      try {
        setMainLoader(true);
        let result = await StakeContract(pid, stakeLpBal);
        // setTokenBalance(result);
        if (result) {
          UserBalance(item?.pid);
          setPercentStake("0");
          setStakeLpBal(0);
          setMainLoader(false);
          HanFarms(item?.pid, item?.lpToken, item?.allocPoint);
          toast.success("Staked Successfully", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (error) {
        setMainLoader(false);
        console.log("eeee", error);
      }
    }
  };
  const WithDrawTokens = async (pid) => {
    if (unStakeLpBal > 0) {
      try {
        let unstakeBal = web3.utils.toWei(unStakeLpBal.toString(), "ether");
        setMainLoader(true);
        let result = await UnstakeContract(pid, unstakeBal);
        if (result) {
          PendingRew(item?.pid);
          UserBalance(pid);
          if (result) {
            setMainLoader(true);
            HanFarms(item?.pid, item?.lpToken, item?.allocPoint);
            setMainLoader(false);
          }
        }
        setMainLoader(false);
        toast.success("Unstaked Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      } catch (error) {
        setMainLoader(false);
        console.log("eeee", error);
      }
    }
  };
  const [abc, setabc] = useState("");
  const abcd = [];

  const handleLiquidity = async (token) => {
    try {
      setMainLoader(true);
      let result = await GetLiquidity(token);
      console.log("setLiqLink", result);
      setLiqLink(result);
      setMainLoader(false);
    } catch {
      setMainLoader(false);
    }
  };

  useEffect(() => {
    if (account) {
      PendingRew(item?.pid);
      UserBalance(item?.pid);
      AllowanceLP(item?.pid, item?.lpToken);
      handleLiquidity(item?.lpToken);
      HanFarms(item?.pid, item?.lpToken, item?.allocPoint);
    }
  }, [account]);

  return (
    <>
      {userBal > 0 ? (
        <div className="col-xl-4 col-lg-6 col-sm-12 padd-sm">
          <div className="carded">
            <div className="headcard">
              <div className="left">
                <div className="imgouterleft">
                  <img
                    src="\assests\Group 1.svg"
                    alt="img"
                    className="leftimg"
                  />
                </div>
                <div className="imgouterright">
                  <img
                    src="\assests\Group 2.svg"
                    alt="img"
                    className="righttimg"
                  />
                </div>
              </div>
              <div className="right">
                <h6 className="righthead">{item?.symbol}</h6>
                <div className="rightinner">
                  {console.log("hrefff", liqLink)}
                  {liqLink && (
                    <a className="rightpara" href={liqLink} target="_blank">
                      Get {item?.symbol} LP
                    </a>
                  )}
                  <img src="\assests\export.svg" alt="img" className="send" />
                </div>
              </div>
            </div>
            <div className="cardinnertext">
              <p className="apy">APY</p>
              <p className="percent">{perecntFarms ? parseFloat(perecntFarms).toFixed(2) + "%" : "0 %"}</p>
            </div>
            <div className="cardinput">
              <p className="inputtext">Pending Reward</p>
              <div className="cardinputinnerblue">
                <input
                  placeholder="0.00"
                  className="reward"
                  value={rewards && rewards}
                  readOnly
                />
                <button
                  className="harvest"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => harvestReward(item?.pid, rewards)}
                >
                  Harvest
                </button>
              </div>
            </div>
            <div className="cardinput">
              <p className="inputtext">{item?.symbol}</p>
              <div className="cardinputinnerblue">
                <input
                  type="number"
                  placeholder="0.00"
                  className="reward"
                  value={userBal ? userBal : 0}
                />
                <button
                  className="sign"
                  data-toggle="modal"
                  data-target={`#exampleModal1${item?.pid}`}
                >
                  -
                </button>
                <button
                  className="sign"
                  data-toggle="modal"
                  data-target={`#exampleModal${item?.pid}`}
                  onClick={() => BalanceOfLP(item?.pid, item?.lpToken)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="stakingmodal">
            <div
              class="modal fade stakingmodal"
              id={`exampleModal1${item?.pid}`}
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog  modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Unstake LP Tokens
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setPercentUS("0");
                        setUnStakeLpBal(0);
                      }}
                    >
                      <img
                        src="\assests\close-circle.svg"
                        className="img-fluid"
                      />
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="stakemodal">
                      <div className="staketext">
                        <p className="stake">Unstake</p>
                        <p className="stake">
                          {userBal}
                          <span> : Balance</span>
                        </p>
                      </div>
                      <div className="stakesquare">
                        <div className="stakesquaretext">
                          <input
                            className="dull"
                            placeholder="0.00"
                            min={0}
                            maxlength={18}
                            value={unStakeLpBal}
                            onChange={(e) => {
                              setUnStakeLpBal(e.target.value);
                              setPercentUS("");
                            }}
                          />
                          <p className="dark">{item?.symbol}</p>
                        </div>
                        <div className="percentages">
                          <span
                            className={
                              percenUnS == 25 ? "percent blue" : "percent"
                            }
                            onClick={() => handleUnStake("25")}
                          >
                            25%
                          </span>
                          <span
                            className={
                              percenUnS == 50 ? "percent blue" : "percent"
                            }
                            onClick={() => handleUnStake("50")}
                          >
                            50%
                          </span>
                          <span
                            className={
                              percenUnS == 75 ? "percent blue" : "percent"
                            }
                            onClick={() => handleUnStake("75")}
                          >
                            75%
                          </span>
                          <span
                            className={
                              percenUnS == "Max" ? "percent blue" : "percent"
                            }
                            onClick={() => handleUnStake("Max")}
                          >
                            MAX
                          </span>
                        </div>
                        {/* {`percent ${percen == 50 && "blue"}`} */}
                      </div>
                      <div className="stakebtns">
                        <button
                          className="cancel"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setPercentUS("0");
                            setUnStakeLpBal(0);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="confirm"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => WithDrawTokens(item?.pid)}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div
              class="modal fade stakingmodal"
              id={`exampleModal${item?.pid}`}
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Stake LP Tokens
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setPercentStake("0");
                        setStakeLpBal(0);
                      }}
                    >
                      <img src="\assests\close-circle.svg" />
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="stakemodal">
                      <div className="staketext">
                        <p className="stake">Stake</p>
                        <p className="stake">
                          {tokenBalance}
                          <span> : Balance</span>
                        </p>
                      </div>
                      <div className="stakesquare">
                        <div className="stakesquaretext">
                          <input
                            className="dull"
                            min={0}
                            maxlength={19}
                            placeholder="0.00"
                            value={stakeLpBal}
                            onChange={(e) => {
                              setStakeLpBal(e.target.value);
                              setPercentStake("");
                            }}
                          />
                          <p className="dark">{item?.symbol}</p>
                        </div>
                        <div className="percentages">
                          <span
                            className={
                              percen == 25 ? "percent blue" : "percent"
                            }
                            onClick={() => handleStakeP("25")}
                          >
                            25%
                          </span>
                          <span
                            className={
                              percen == 50 ? "percent blue" : "percent"
                            }
                            onClick={() => handleStakeP("50")}
                          >
                            50%
                          </span>
                          <span
                            className={
                              percen == 75 ? "percent blue" : "percent"
                            }
                            onClick={() => handleStakeP("75")}
                          >
                            75%
                          </span>
                          <span
                            className={
                              percen == "Max" ? "percent blue" : "percent"
                            }
                            onClick={() => handleStakeP("Max")}
                          >
                            MAX
                          </span>
                        </div>
                      </div>
                      <div className="stakebtns">
                        <button
                          className="cancel"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setPercentStake("0");
                            setStakeLpBal(0);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="confirm"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => StakeTokens(item?.pid)}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : allowance > 0 ? (
        <div className="col-xl-4 col-lg-6 col-sm-12 padd-sm">
          <div className="carded">
            <div className="headcard">
              <div className="left">
                <div className="imgouterleft">
                  <img
                    src="\assests\Group 1.svg"
                    alt="img"
                    className="leftimg"
                  />
                </div>
                <div className="imgouterright">
                  <img
                    src="\assests\Group 2.svg"
                    alt="img"
                    className="righttimg"
                  />
                </div>
              </div>
              <div className="right">
                <h6 className="righthead">{item?.symbol}</h6>
                <div className="rightinner">
                  {liqLink && (
                    <a className="rightpara" href={liqLink} target="_blank">
                      Get {item?.symbol} LP
                    </a>
                  )}
                  <img src="\assests\export.svg" alt="img" className="send" />
                </div>
              </div>
            </div>
            <div className="cardinnertext">
              <p className="apy">APY</p>
              <p className="percent">{perecntFarms ? parseFloat(perecntFarms).toFixed(2) + "%" : "0 %"}</p>
            </div>
            <div className="cardinput">
              <p className="inputtext">Pending Reward</p>
              <div className="cardinputinnerblue">
                <input
                  type="number"
                  placeholder="0.00"
                  className="reward inputttt-diabled"
                  readOnly
                />
                <button className="harvest btn-disabled">Harvest</button>
              </div>
            </div>
            <div className="cardinput">
              <p className="inputtext">{item?.symbol}</p>
              <div className="cardinputinnerblue">
                <input
                  type="number"
                  placeholder="0.00"
                  className="reward"
                  data-toggle="modal"
                  data-target={`#exampleModal${item?.pid}`}
                  value=""
                  onClick={() => {
                    BalanceOfLP(item?.pid, item?.lpToken);
                    setPercentStake("0");
                    setStakeLpBal(0);
                  }}
                />
                <button
                  className="harvest"
                  data-toggle="modal"
                  data-target={`#exampleModal${item?.pid}`}
                  onClick={() => BalanceOfLP(item?.pid, item?.lpToken)}
                >
                  Stake LP
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div
              class="modal fade stakingmodal"
              id={`exampleModal${item?.pid}`}
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Stake LP Tokens
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setPercentStake("0");
                        setStakeLpBal(0);
                      }}
                    >
                      <img src="\assests\close-circle.svg" />
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="stakemodal">
                      <div className="staketext">
                        <p className="stake">Stake</p>
                        <p className="stake">
                          {tokenBalance}
                          <span> : Balance</span>
                        </p>
                      </div>
                      <div className="stakesquare">
                        <div className="stakesquaretext">
                          <input
                            min={0}
                            maxlength={19}
                            className="dull"
                            placeholder="0.00"
                            value={stakeLpBal}
                            onChange={(e) => {
                              setStakeLpBal(e.target.value);
                              setPercentStake("");
                            }}
                          />
                          <p className="dark">{item?.symbol}</p>
                        </div>
                        <div className="percentages">
                          <span
                            className={
                              percen == 25 ? "percent blue" : "percent"
                            }
                            onClick={() => handleStakeP("25")}
                          >
                            25%
                          </span>
                          <span
                            className={
                              percen == 50 ? "percent blue" : "percent"
                            }
                            onClick={() => handleStakeP("50")}
                          >
                            50%
                          </span>
                          <span
                            className={
                              percen == 75 ? "percent blue" : "percent"
                            }
                            onClick={() => handleStakeP("75")}
                          >
                            75%
                          </span>
                          <span
                            className={
                              percen == "Max" ? "percent blue" : "percent"
                            }
                            onClick={() => handleStakeP("Max")}
                          >
                            MAX
                          </span>
                        </div>
                      </div>
                      <div className="stakebtns">
                        <button
                          className="cancel"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setPercentStake("0");
                            setStakeLpBal(0);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="confirm"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => StakeTokens(item?.pid)}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-xl-4 col-lg-6 col-sm-12 padd-sm">
          <div className="carded">
            <div className="headcard">
              <div className="left">
                <div className="imgouterleft">
                  <img
                    src="\assests\Group 1.svg"
                    alt="img"
                    className="leftimg"
                  />
                </div>
                <div className="imgouterright">
                  <img
                    src="\assests\Group 2.svg"
                    alt="img"
                    className="righttimg"
                  />
                </div>
              </div>
              <div className="right">
                <h6 className="righthead">{item?.symbol}</h6>
                <div className="rightinner">
                  {liqLink && (
                    <a className="rightpara" href={liqLink} target="_blank">
                      Get {item?.symbol} LP
                    </a>
                  )}
                  <img src="\assests\export.svg" alt="img" className="send" />
                </div>
              </div>
            </div>
            <div className="cardinnertext">
              <p className="apy">APY</p>
              <p className="percent">{perecntFarms ? parseFloat(perecntFarms).toFixed(2) + "%" : "0 %"}</p>
            </div>
            <div className="cardinput">
              <p className="inputtext">Pending Reward</p>
              <div className="cardinputinner">
                <input
                  type="number"
                  placeholder="0.00"
                  className="reward"
                  readOnly
                />
                <button className="harvest">Harvest</button>
              </div>
            </div>
            <div className="cardlastbtn">
              <button
                className="enable"
                onClick={() => ApproveFun(item?.pid, item?.lpToken)}
              >
                Enable Contract
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FarmChild;
