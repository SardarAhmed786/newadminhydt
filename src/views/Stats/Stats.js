import React from "react";
import ReverseBalance from "views/Graphs/ReverseBalance";
import "./stats.scss";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import Environment from "../../utils/environment";
import Graph from "../../hooks/Graph";
import GraphReserves from "../../hooks/GraphReserves";
import GraphRedeem from "../../hooks/GraphRedeem";
import GraphHydtBusd from "../../hooks/graphHydtBusd";

const Stats = () => {
  const { account } = useWeb3React();
  const [statsAD, setStatsAD] = useState("");
  const [reservesBal, setReservesBal] = useState("");
  const [graphHistory, setGraphHistory] = useState("");
  const [hydtBusd, setHydtBusd] = useState("");

  const [activeDTime, setADTime] = useState(7); // Active Deposit

  const [reserveBnb, setReserveBnb] = useState(true); // reserves
  const [history, setHistory] = useState(true); // History

  const [mintHTime, setMHTime] = useState(7); // Mint History
  const [resBnbTime, setResBnbT] = useState(7); // reserves
  const [busdHydt, setBusdHydt] = useState(7); // Hydt/Busd

  console.log("activeDTime111112222222", reserveBnb, resBnbTime);
  console.log("23322223", mintHTime);

  const getActiveDeposits = () => {
    // setMainLoader(true);
    var now = new Date();
    const currentTime = now.getTime() / 1000;
    const previousTime = parseInt(currentTime - 86400 * activeDTime).toString();
    console.log("dsvsdcdsefsd34", previousTime);
    var data = JSON.stringify({
      query: `query MyQuery {
            volumes(
              where: {type: "Earn", blockTimestamp_gte: ${previousTime}}
              orderBy: blockTimestamp
              orderDirection: asc
            ) {
              amount
              blockTimestamp
            }
          }`,
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
        setStatsAD(response?.data?.data?.volumes);
        console.log("minted", response?.data?.data?.volumes);
        // setMainLoader(false);
      })
      .catch(function (error) {
        // setMainLoader(false);
      });
  };

  const getReserves = () => {
    // setMainLoader(true);
    let days = "";
    if (reserveBnb == true) {
      days = "Reserve BNB";
    } else {
      days = "Reserve USD";
    }
    var now = new Date();
    const currentTime = now.getTime() / 1000;
    const previousTime = parseInt(currentTime - 86400 * resBnbTime).toString();
    console.log("previousTimepreviousTime000000", previousTime);
    var data = JSON.stringify({
      query: `
          query MyQuery {
            volumes(
              where: {type: "${days}", blockTimestamp_gte: ${previousTime}}
              orderBy: blockTimestamp
              orderDirection: asc
            ) {
              amount
              blockTimestamp
            }
          }`,
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
        setReservesBal(response?.data?.data?.volumes);
        console.log("aaaaaaaaaaa", response?.data?.data?.volumes);
        // setMainLoader(false);
      })
      .catch(function (error) {
        // setMainLoader(false);
      });
  };
  const handleReserves = () => {
    setReserveBnb(!reserveBnb);
    setResBnbT(7);
  };

  const getHistory = () => {
    // setMainLoader(true);
    let type = "";
    if (history == true) {
      type = "Mint";
    } else {
      type = "Redeem";
    }
    var now = new Date();
    const currentTime = now.getTime() / 1000;
    const previousTime = (parseInt(currentTime - 86400 * mintHTime)).toString();
    console.log("previousTimeprevmmklmm2iousTime1111",previousTime);
    var data = JSON.stringify({
      query: `query MyQuery {
        volumes(
          where: {type: "${type}", blockTimestamp_gte: ${previousTime}}
          orderBy: blockTimestamp
          orderDirection: asc
        ) {
          amount
          blockTimestamp
        }
      }`,
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
        console.log("wwwwwwwwws", response?.data?.data?.volumes);
        setGraphHistory(response?.data?.data?.volumes);
        // setMainLoader(false);
      })
      .catch(function (error) {
        // setMainLoader(false);
      });
  };
  const handleHistory = () => {
    setHistory(!history);
    setMHTime(7);
  };

  const getHydtBusd = () => {
    // setMainLoader(true);
    var now = new Date();
    const currentTime = now.getTime() / 1000;
    const previousTime = parseInt(currentTime - 86400 * busdHydt).toString();
    console.log("previousTimepreviousTime3333", previousTime);
    var data = JSON.stringify({
      query: `query MyQuery {
            volumes(
              where: {type: "Price", blockTimestamp_gte:  ${previousTime}}
              orderBy: blockTimestamp
              orderDirection: asc
            ) {
              amount
              blockTimestamp
            }
          }`,
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
        setHydtBusd(response?.data?.data?.volumes);
        console.log("AAAAAAAAAA", response?.data?.data?.volumes);
        // setMainLoader(false);
      })
      .catch(function (error) {
        // setMainLoader(false);
      });
  };

  useEffect(() => {
    if (account) {
      getReserves();
    }
  }, [account, resBnbTime, reserveBnb]);
  useEffect(() => {
    if (account) {
      getHistory();
    }
  }, [account, history, mintHTime]);
  useEffect(() => {
    if (account) {
      getActiveDeposits();
    }
  }, [account, activeDTime]);
  useEffect(() => {
    if (account) {
      getHydtBusd();
    }
  }, [account, busdHydt]);
  console.log("statsADstatsADstatsAD", statsAD);
  return (
    <>
      <div className="content">
        <section className="stats">
          <div className="main-heading">
            <h4 className="ml-15">Statistics</h4>
          </div>
          <div className="row">
            <div className="col-xl-6 col-12 padd-sm">
              <div className="main-graph">
                <div className="upper-heading">
                  <h6>Reserve Balance</h6>
                </div>
                <div className="bottom-heading">
                  {reserveBnb == true ? (
                    <div className="left">
                      <a
                        className={resBnbTime == 7 && "active"}
                        onClick={() => setResBnbT(7)}
                      >
                        7d
                      </a>
                      <a
                        className={resBnbTime == 30 && "active"}
                        onClick={() => setResBnbT(30)}
                      >
                        30d
                      </a>
                      <a
                        className={resBnbTime == 90 && "active"}
                        onClick={() => setResBnbT(90)}
                      >
                        90d
                      </a>
                      <a
                        className={resBnbTime == 365 && "active"}
                        onClick={() => setResBnbT(365)}
                      >
                        1y
                      </a>
                    </div>
                  ) : (
                    <div className="left">
                      <a
                        className={resBnbTime == 7 && "active"}
                        onClick={() => setResBnbT(7)}
                      >
                        7d
                      </a>
                      <a
                        className={resBnbTime == 30 && "active"}
                        onClick={() => setResBnbT(30)}
                      >
                        30d
                      </a>
                      <a
                        className={resBnbTime == 90 && "active"}
                        onClick={() => setResBnbT(90)}
                      >
                        90d
                      </a>
                      <a
                        className={resBnbTime == 365 && "active"}
                        onClick={() => setResBnbT(365)}
                      >
                        1y
                      </a>
                    </div>
                  )}
                  <div className="right">
                    <a
                      className={reserveBnb == true && "active"}
                      onClick={handleReserves}
                    >
                      BNB
                    </a>
                    <a
                      className={reserveBnb == false && "active"}
                      onClick={handleReserves}
                    >
                      USD
                    </a>
                  </div>
                </div>
                <div className="graph pb-3">
                  <GraphReserves reservesBal={reservesBal} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-12 padd-sm">
              <div className="main-graph">
                <div className="upper-heading">
                  <h6>HYDT/USDT Rate</h6>
                </div>
                <div className="bottom-heading">
                  <div className="left">
                    <a
                      className={busdHydt == 7 && "active"}
                      onClick={() => setBusdHydt(7)}
                    >
                      7d
                    </a>
                    <a
                      className={busdHydt == 30 && "active"}
                      onClick={() => setBusdHydt(30)}
                    >
                      30d
                    </a>
                    <a
                      className={busdHydt == 90 && "active"}
                      onClick={() => setBusdHydt(90)}
                    >
                      90d
                    </a>
                    <a
                      className={busdHydt == 365 && "active"}
                      onClick={() => setBusdHydt(365)}
                    >
                      1y
                    </a>
                  </div>
                </div>
                <div className="graph pb-3">
                  <GraphHydtBusd hydtBusd={hydtBusd} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-12 padd-sm">
              <div className="main-graph">
                <div className="upper-heading" style={{ padding: "12px 20px" }}>
                  <div className="twice-tab histroy">
                    <a
                      className={history == true && "active"}
                      onClick={handleHistory}
                    >
                      Mint History
                    </a>
                    <a
                      className={history == false && "active"}
                      onClick={handleHistory}
                    >
                      Redeem History
                    </a>
                  </div>
                </div>
                <div className="bottom-heading">
                  {history == true ? (
                    <div className="left">
                      <a
                        className={mintHTime == 7 && "active"}
                        onClick={() => setMHTime(7)}
                      >
                        7d
                      </a>
                      <a
                        className={mintHTime == 30 && "active"}
                        onClick={() => setMHTime(30)}
                      >
                        30d
                      </a>
                      <a
                        className={mintHTime == 90 && "active"}
                        onClick={() => setMHTime(90)}
                      >
                        90d
                      </a>
                      <a
                        className={mintHTime == 365 && "active"}
                        onClick={() => setMHTime(365)}
                      >
                        1y
                      </a>
                    </div>
                  ) : (
                    <div className="left">
                      <a
                        className={mintHTime == 7 && "active"}
                        onClick={() => setMHTime(7)}
                      >
                        7d
                      </a>
                      <a
                        className={mintHTime == 30 && "active"}
                        onClick={() => setMHTime(30)}
                      >
                        30d
                      </a>
                      <a
                        className={mintHTime == 90 && "active"}
                        onClick={() => setMHTime(90)}
                      >
                        90d
                      </a>
                      <a
                        className={mintHTime == 365 && "active"}
                        onClick={() => setMHTime(365)}
                      >
                        1y
                      </a>
                    </div>
                  )}
                </div>
                <div className="graph pb-3">
                  <GraphRedeem graphHistory={graphHistory} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-12 padd-sm">
              <div className="main-graph">
                <div className="upper-heading">
                  <h6>Active Deposits</h6>
                </div>
                <div className="bottom-heading">
                  <div className="left">
                    <a
                      className={activeDTime == 7 && "active"}
                      onClick={() => setADTime(7)}
                    >
                      7d
                    </a>
                    <a
                      className={activeDTime == 30 && "active"}
                      onClick={() => setADTime(30)}
                    >
                      30d
                    </a>
                    <a
                      className={activeDTime == 90 && "active"}
                      onClick={() => setADTime(90)}
                    >
                      90d
                    </a>
                    <a
                      className={activeDTime == 365 && "active"}
                      onClick={() => setADTime(365)}
                    >
                      1y
                    </a>
                  </div>
                </div>
                <div className="graph pb-3">
                  {/* <img src="\assests\buttonsvgs\dummygrapgh.png" alt="img" className='img-fluid' /> */}
                  {/* <ReverseBalance /> */}
                  <Graph statsAD={statsAD} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Stats;
