import "./dashboard.scss";
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import ClaimRewardsD from "../../hooks/dataFetchers/claimRewardsD";
import ClaimRewardsD1 from "../../hooks/dataFetchers/claimRewardsD1";
import ClaimRewardsD2 from "../../hooks/dataFetchers/claimRewardsD2";
import DepositRewardsD2 from "../../hooks/dataFetchers/depositRewardsD2";
import Loader from "../../hooks/loader";
import useWeb3 from "../../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from 'react';
import Environment from "../../utils/environment";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import DepositRewardsD1 from "../../hooks/dataFetchers/depositRewardsD1";

function Dashboard() {
  const history = useHistory();
  const { dashRewards } = ClaimRewardsD();
  const { dashRewardsOne } = ClaimRewardsD1();
  const { dashRewardsTwo } = ClaimRewardsD2();
  const [pendingRew, setPendingRew] = useState("");
  const [pendingRew1, setPendingRew1] = useState("");
  const [pendingRew2, setPendingRew2] = useState("");
  const [amountActive, setAmount] = useState("");

  const { dashdepositd1 } = DepositRewardsD1();
  const { dashdepositd2 } = DepositRewardsD2();
  const [depositRew, DepositRewardsD] = useState("");
  const [depositRew1, setDepositRewardsD1] = useState("");
  const [depositRew2, setDepositRewardsD2] = useState("");
  const [mainLoader, setMainLoader] = useState(false);

  const web3 = useWeb3();
  const { account } = useWeb3React();
  const handleRew = async () => {
    try {
      setMainLoader(true);
      let result = await dashRewards();
      console.log('00000ppppp', result);
      setPendingRew(result);
      setMainLoader(false);
    }
    catch {
      setMainLoader(false);
    }
  };
  const handleRewone = async () => {
    try {
      setMainLoader(true);
      let result = await dashRewardsOne();
      setPendingRew1(result);
      setMainLoader(false);

    }
    catch {
      setMainLoader(false);
    }
  };
  const handleRewtwo = async () => {
    try {
      setMainLoader(true);
      let result = await dashRewardsTwo();
      setPendingRew2(result);
      setMainLoader(false);
    }
    catch {
      setMainLoader(false);
    }
  };

  const handleDepRewtwo = async () => {
    try {
      setMainLoader(true);
      let result = await dashdepositd2();
      setDepositRewardsD2(result);
      setMainLoader(false);
    }
    catch {
      setMainLoader(false);
    }
  };
  const handleDepRewOne = async () => {
    try {
      setMainLoader(true);
      let result = await dashdepositd1();
      setDepositRewardsD1(result);
      setMainLoader(false);
    }
    catch {
      setMainLoader(false);
    }
  };


  useEffect(() => {
    handleRew();
    handleRewone();
    handleRewtwo();
    handleDepRewtwo();
    handleDepRewOne();
  }, [account]);
  //Graph Apis

  const getActiveDeposit = () => {
    setMainLoader(true);
    let account1 = account.toLowerCase();
    let acc = JSON.stringify(account1 + "-Earn");
    // let accounttt = acc.split("-")[1]; 
    var data = JSON.stringify({
      query: `query 
      MyQuery {userVolumes(where: {id: ${acc}}) {
        amount
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
        console.log("minted111111", response?.data?.data?.userVolumes[0].amount);
        setAmount(web3.utils.fromWei(response?.data?.data?.userVolumes[0].amount, "ether"));
        setMainLoader(false);
      })
      .catch(function (error) {
        setMainLoader(false);
      });
  };
  useEffect(() => {
    if (account) {
      getActiveDeposit();
    }
  }, [account]);
  console.log("depositRew2depositRew2", amountActive);
  return (
    <>
      {mainLoader && <Loader />}
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
                        <h6> 1,521</h6>
                      </div>
                    </div>
                  </div>
                  <div className="inner-card forheight">
                    <div className="upper-head">
                      <h6>HYDT Staked via Affiliate Program</h6>
                    </div>
                    <div className="bottom-content">
                      <div className="left">
                        <h6> 524,345.54 <span>HYDT<img src="\assests\buttonsvgs\hydt.svg" alt="img" className="img-fluid ml-2x" /></span> </h6>
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
                        <h6>524,345.54 <span>HYDT <img src="\assests\buttonsvgs\hydt.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>125,705 <span>(No Vesting) HYGT <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>125,705 <span>(3 Months (2.5x) HYGT) <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>125,705 <span>12 Months (25x) HYGT <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
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
                        <h6>524,345.54 <span>HYDT <img src="\assests\buttonsvgs\hydt.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>125,705 <span>(No Vesting) HYGT <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>125,705 <span>(3 Months (2.5x) HYGT) <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                        <h6>125,705 <span>12 Months (25x) HYGT <img src="\Frame.svg" alt="img" className="img-fluid ml-2x" /></span></h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-12 padds">
                  <div className="main-heading">
                    <h4 className="ml-15 formar ">Top Referrers by Staking Amount</h4>

                  </div>
                  <div className="cardss">
                    <div className="parent">
                      <div className="inner">
                        <h4>No.</h4>
                        <h4>User</h4>
                        <h4>Staking Amount</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>1</h4>
                       
                       <div className="second">
                       <h4>John Doe</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>250,000</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>2</h4>
                       
                       <div className="second">
                       <h4>Damon Holland</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>350,000</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>3</h4>
                       
                       <div className="second">
                       <h4>Jerry kelly</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>50,000</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>4</h4>
                       
                       <div className="second">
                       <h4>Chris Hemsworth</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>7,000</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>5</h4>
                       
                       <div className="second">
                       <h4>Merlin</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>5,000</h4>
                      </div>
                      
                    </div>
                  </div>
                  <div className="pagi">
                  <div className="left">
                  </div>
                  <div className="right">
                    <div className='arrows'>
                      <img src='\assests\pagi.svg' alt='1mg' className='img-fluid' />
                    
                    </div>
                    <Pagination>
                      <Pagination.Item active>{1}</Pagination.Item>
                      <Pagination.Item>/</Pagination.Item>
                      <Pagination.Item >{10}</Pagination.Item>
                    
                    </Pagination>
                    <div className='arrows'>
                      <img src='\assests\pagiright.svg' alt='1mg' className='img-fluid' />
              
                    </div>
                  </div>
                </div>
                </div>
            
                <div className="col-xl-6 col-12 padds ">
                  <div className="main-heading">
                    <h4 className="ml-15 formar ">Top Referrers by Commissions</h4>

                  </div>
                  <div className="cardss">
                    <div className="parent">
                      <div className="inner">
                        <h4>No.</h4>
                        <h4>User</h4>
                        <h4>Commissions</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>1</h4>
                       
                       <div className="second">
                       <h4>John Doe</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>250,000</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>2</h4>
                       
                       <div className="second">
                       <h4>Damon Holland</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>350,000</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>3</h4>
                       
                       <div className="second">
                       <h4>Jerry kelly</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>50,000</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>4</h4>
                       
                       <div className="second">
                       <h4>Chris Hemsworth</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>7,000</h4>
                      </div>
                      
                    </div>
                    <div className="parenthead">
                      <div className="inner">
                     
                        <h4>5</h4>
                       
                       <div className="second">
                       <h4>Merlin</h4>
                       <p>0x12BB....JHE9</p>
                       </div>
                       
                        <h4>5,000</h4>
                      </div>
                      
                    </div>
                  </div>
                  <div className="pagi">
                  <div className="left">
                  </div>
                  <div className="right">
                    <div className='arrows'>
                      <img src='\assests\pagi.svg' alt='1mg' className='img-fluid' />
                    
                    </div>
                    <Pagination>
                      <Pagination.Item active>{1}</Pagination.Item>
                      <Pagination.Item>/</Pagination.Item>
                      <Pagination.Item >{10}</Pagination.Item>
                    
                    </Pagination>
                    <div className='arrows'>
                      <img src='\assests\pagiright.svg' alt='1mg' className='img-fluid' />
              
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}
export default Dashboard;
