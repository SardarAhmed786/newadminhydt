import "./dashboard.scss";

import { useWeb3React } from "@web3-react/core";
import Pagination from 'react-bootstrap/Pagination';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Envirnoment from '../../utils/environment'
import TopRRefByStaking from "./subcomponents/TopRRefByStaking";
import TopRefByCommision from "./subcomponents/TopRefByCommision";
function Dashboard() {
  const { account } = useWeb3React();
  const accessToken = localStorage.getItem('accessToken');
  const [adminData, setAdminData] = useState()
  function getRefFunc() {

    axios
      .get(Envirnoment.apiUrl + 'users/get-admin-data', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        // You can perform additional actions based on the API response
        setAdminData(response?.data?.data)
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
      getRefFunc()
    }
  }, [account])
  return (
    <>
      {/* {mainLoader && <Loader />} */}
      <div className="content">
        <section className="main-dashboard">
          <div className="first">
            <div className="main-heading">
              <h4 className="ml-15">Hello,<span>Admin</span></h4>
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
                        <h6> {adminData?.totalStakedAmount} <span>HYDT<img src="\assests\buttonsvgs\hydt.svg" alt="img" className="img-fluid ml-2x" /></span> </h6>
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
                        <h6>{parseFloat(adminData?.commissions?.approved[0]?.totalStakedAmount || 0)?.toFixed(4)} <span>HYDT <img src="\assests\buttonsvgs\hydt.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>{parseFloat(adminData?.commissions?.approved[0]?.noVestingAmount  || 0)?.toFixed(4)} <span>(No Vesting) HYGT <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>{parseFloat(adminData?.commissions?.approved[0]?.threeMonthsVestingAmount  || 0)?.toFixed(4)} <span>(3 Months (2.5x) HYGT) <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>{parseFloat(adminData?.commissions?.approved[0]?.twelveMonthsVestingAmount  || 0)?.toFixed(4)} <span>12 Months (25x) HYGT <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                     </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-12 padd-sm">
                  <div className="inner-card">
                    <div className="upper-head">
                      <h6>HYDT/USD Rate</h6>
                      {/* <button className="btn-transparent">Claim</button> */}
                    </div>
                    <div className="bottom-content">
                      <div className="left">
                        <h6>{parseFloat(adminData?.commissions?.pending[0]?.totalStakedAmount || 0)?.toFixed(4)} <span>HYDT <img src="\assests\buttonsvgs\hydt.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>{parseFloat(adminData?.commissions?.pending[0]?.noVestingAmount || 0)?.toFixed(4)} <span>(No Vesting) HYGT <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>{parseFloat(adminData?.commissions?.pending[0]?.threeMonthsVestingAmount || 0)?.toFixed(4)} <span>(3 Months (2.5x) HYGT) <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>{parseFloat(adminData?.commissions?.pending[0]?.twelveMonthsVestingAmount || 0)?.toFixed(4)} <span>12 Months (25x) HYGT <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
               <TopRRefByStaking/>
                <TopRefByCommision/>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}
export default Dashboard;
