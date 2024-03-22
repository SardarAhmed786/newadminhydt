import "./dashboard.scss";

import { useWeb3React } from "@web3-react/core";
import Pagination from "react-bootstrap/Pagination";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Envirnoment from "../../utils/environment";
import TopRRefByStaking from "./subcomponents/TopRRefByStaking";
import TopRefByCommision from "./subcomponents/TopRefByCommision";
function Dashboard({ bool }) {
  console.log(bool);
  const { account } = useWeb3React();
  const accessToken = localStorage.getItem("accessToken");
  const [adminData, setAdminData] = useState();
  const [hygtComRate, setHygtCommisionRates] = useState();

  function getHygtComRateFunc() {
    axios
      .get(Envirnoment.apiUrl + "commission-rates/hygt", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        // You can perform additional actions based on the API response
        setHygtCommisionRates(response?.data?.data?.hygtCommission);
      })
      .catch((error) => {
        // Handle API errors here
        // toast.error(error.request?.statusText)
      })
      .finally(() => {
        // setIsConfirmLoading(false);
      });
  }
  function getRefFunc() {
    axios
      .get(Envirnoment.apiUrl + "users/get-admin-data", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // You can perform additional actions based on the API response
        setAdminData(response?.data?.data);
      })
      .catch((error) => {
        // Handle API errors here
        // toast.error(error.request?.statusText)
      })
      .finally(() => {
        // setIsConfirmLoading(false);
      });
  }
  useEffect(() => {
    if (account) {
      let user = localStorage.getItem("user");
      user && getRefFunc();
      user && getHygtComRateFunc();
    }
  }, [account, accessToken, bool]);
  return (
    <>
      {/* {mainLoader && <Loader />} */}
      {account && (
        <div className="content">
          <section className="main-dashboard">
            <div className="first">
              <div className="main-heading">
                <h4 className="ml-15">
                  Hello,<span>Admin</span>
                </h4>
              </div>
            </div>
            <div className="second">
              <div className="content-main">
                <div className="row">
                  <div className="col-xl-4 col-12 padd-sm">
                    <div className="inner-card forheight">
                      <div className="upper-head">
                        <h6>Registered Users in Affiliate Program</h6>
                      </div>
                      <div className="bottom-content">
                        <div className="left">
                          <h6>{adminData?.userCount}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="inner-card forheight">
                      <div className="upper-head">
                        <h6>HYDT Staked via Affiliate Program</h6>
                      </div>
                      <div className="bottom-content">
                        <div className="left">
                          <h6>
                            {" "}
                            {adminData?.totalStakedAmount}{" "}
                            <span>
                              HYDT
                              <img
                                src="\assests\buttonsvgs\hydt.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-12 padd-sm">
                    <div className="inner-card">
                      <div className="upper-head">
                        <h6>Commissions Approved</h6>
                        {/* <button className="btn-transparent">Claim</button> */}
                      </div>
                      <div className="bottom-content">
                        <div className="left">
                          <h6>
                            {adminData?.commissions?.approved[0]
                              ?.totalStakedAmount
                              ? parseFloat(
                                  adminData?.commissions?.approved[0]
                                    ?.totalStakedAmount || 0
                                )?.toFixed(4)
                              : 0}
                            {/* {parseFloat(
                              adminData?.commissions?.approved[0]
                                ?.totalStakedAmount || 0
                            )?.toFixed(4)}{" "} */}
                            <span>
                              HYDT{" "}
                              <img
                                src="\assests\buttonsvgs\hydt.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>
                          </h6>
                          <h6>
                            {adminData?.commissions?.approved[0]
                              ?.noVestingAmount && hygtComRate
                              ? parseFloat(
                                  (adminData?.commissions?.approved[0]
                                    ?.noVestingAmount || 0) * hygtComRate
                                )?.toFixed(4)
                              : 0}

                            {/* {parseFloat(
                              (adminData?.commissions?.approved[0]
                                ?.noVestingAmount || 0) * hygtComRate
                            )?.toFixed(4)}{" "} */}
                            <span>
                              (No Vesting) HYGT{" "}
                              <img
                                src="\Frame.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>
                          </h6>
                          <h6>
                            {adminData?.commissions?.approved[0]
                              ?.threeMonthsVestingAmount && hygtComRate
                              ? parseFloat(
                                  (adminData?.commissions?.approved[0]
                                    ?.threeMonthsVestingAmount || 0) *
                                    2.5 *
                                    hygtComRate
                                )?.toFixed(4)
                              : 0}
                            {/* {parseFloat(
                              (adminData?.commissions?.approved[0]
                                ?.threeMonthsVestingAmount || 0) *
                                2.5 *
                                hygtComRate
                            )?.toFixed(4)}{" "} */}
                            <span>
                              (3 Months (2.5x) HYGT){" "}
                              <img
                                src="\Frame.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>
                          </h6>
                          <h6>
                            {adminData?.commissions?.approved[0]
                              ?.twelveMonthsVestingAmount && hygtComRate
                              ? parseFloat(
                                  (adminData?.commissions?.approved[0]
                                    ?.twelveMonthsVestingAmount || 0) *
                                    25 *
                                    hygtComRate
                                )?.toFixed(4)
                              : 0}
                            {/* {parseFloat(
                              (adminData?.commissions?.approved[0]
                                ?.twelveMonthsVestingAmount || 0) *
                                25 *
                                hygtComRate
                            )?.toFixed(4)}{" "} */}
                            <span>
                              12 Months (25x) HYGT{" "}
                              <img
                                src="\Frame.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-12 padd-sm">
                    <div className="inner-card">
                      <div className="upper-head">
                        <h6>Commissions Pending Approval</h6>
                        {/* <button className="btn-transparent">Claim</button> */}
                      </div>
                      <div className="bottom-content">
                        <div className="left">
                          <h6>
                            {adminData?.commissions?.pending[0]
                              ?.totalStakedAmount
                              ? parseFloat(
                                  adminData?.commissions?.pending[0]
                                    ?.totalStakedAmount || 0
                                )?.toFixed(4)
                              : 0}

                            {/* {parseFloat(
                              adminData?.commissions?.pending[0]
                                ?.totalStakedAmount || 0
                            )?.toFixed(4)}{" "} */}
                            <span>
                              HYDT{" "}
                              <img
                                src="\assests\buttonsvgs\hydt.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>
                          </h6>
                          <h6>
                            {adminData?.commissions?.pending[0]
                              ?.noVestingAmount && hygtComRate
                              ? parseFloat(
                                  (adminData?.commissions?.pending[0]
                                    ?.noVestingAmount || 0) * hygtComRate
                                )?.toFixed(4)
                              : 0}
                            {/* {parseFloat(
                              (adminData?.commissions?.pending[0]
                                ?.noVestingAmount || 0) * hygtComRate
                            )?.toFixed(4)}{" "} */}
                            <span>
                              (No Vesting) HYGT{" "}
                              <img
                                src="\Frame.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>
                          </h6>
                          <h6>
                            {adminData?.commissions?.pending[0]
                              ?.threeMonthsVestingAmount && hygtComRate
                              ? parseFloat(
                                  (adminData?.commissions?.pending[0]
                                    ?.threeMonthsVestingAmount || 0) *
                                    2.5 *
                                    hygtComRate
                                )?.toFixed(4)
                              : 0}

                            {/* {parseFloat(
                              (adminData?.commissions?.pending[0]
                                ?.threeMonthsVestingAmount || 0) *
                                2.5 *
                                hygtComRate
                            )?.toFixed(4)}{" "} */}
                            <span>
                              (3 Months (2.5x) HYGT){" "}
                              <img
                                src="\Frame.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>
                          </h6>
                          <h6>
                            {adminData?.commissions?.pending[0]
                              ?.twelveMonthsVestingAmount && hygtComRate
                              ? parseFloat(
                                  (adminData?.commissions?.pending[0]
                                    ?.twelveMonthsVestingAmount || 0) *
                                    hygtComRate *
                                    25
                                )?.toFixed(4)
                              : 0}
                            {/* {parseFloat(
                              (adminData?.commissions?.pending[0]
                                ?.twelveMonthsVestingAmount || 0) *
                                hygtComRate *
                                25
                            )?.toFixed(4)}{" "} */}
                            <span>
                              12 Months (25x) HYGT{" "}
                              <img
                                src="\Frame.svg"
                                alt="img"
                                className="img-fluid ml-2x"
                              />
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <TopRRefByStaking />
                  <TopRefByCommision />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
export default Dashboard;
