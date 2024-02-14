import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Envirnoment from '../../utils/environment'
import { useWeb3React } from "@web3-react/core";

import "./earn.scss";
import Pagination from 'react-bootstrap/Pagination';
import { Nav } from 'react-bootstrap';



const Earn = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const { account } = useWeb3React();
  const accessToken = localStorage.getItem('accessToken');
  const [pendingData, setPendingData] = useState()
  // const [status, setStatus] = useState('pending')
  const [offset, setOffset] = useState(1)
  function getTopRefByEarnComFunc() {
    const params = {
      offset,
      limit: 10,
      status: activeTab
    };

    axios
      .get(Envirnoment.apiUrl + 'withdraw/get-withdraw-list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
      })
      .then((response) => {
        console.log('data', response?.data?.data);
        // You can perform additional actions based on the API response
        setPendingData(response?.data?.data);
      })
      .catch((error) => {
        // Handle API errors here
        // toast.error(error.request?.statusText)
      })
      .finally(() => {
        // setIsConfirmLoading(false);
      });
  }
  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  useEffect(() => {
    if (account) {
      getTopRefByEarnComFunc()
    }
  }, [account, offset, activeTab])
  console.log('data', pendingData);
  console.log(activeTab);
  return (
    <>

      <div className="content">
        <section className="main-earn">
          <div className="row">
            <div className="col-xl-12 col-12 p-0">
              <div className="mainhead">
                <h2>Commissions</h2>
              </div>
              <div className='mainssss'>
                <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                  <Nav.Item>
                    <Nav.Link eventKey="pending">Pending</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="approved">Approved</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="rejected">
                      Rejected
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <div className="parentbtn">
                  <button className="reject">Rejected</button>
                  <button className="approve">Approve</button>
                </div>
              </div>

              {(activeTab === 'pending' || activeTab === 'approved' || activeTab === 'rejected') && (
                <>
                  {pendingData?.withdraws?.length === 0 ?
                    <div className="maincard">
                      <div className="text-center py-5 my-5">
                        <h2>No Data Found</h2>
                      </div>
                    </div>
                    :
                    <div className="maincard">

                      <div className="parent">
                        <div className="first">
                          <div class="example">
                            <label class="checkbox-button">
                              <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                              <span class="checkbox-button__control"></span>
                              <span class="checkbox-button__label"></span>
                            </label>
                          </div>
                        </div>
                        <div className="second">
                          <h4>Time</h4>
                        </div>
                        <div className="third">
                          <h4>User</h4>
                        </div>
                        <div className="fourth">
                          <h4>Claimed Amount</h4>
                        </div>
                        <div className="five">
                          <h4>HYGT Vesting</h4>
                        </div>

                      </div>
                      {pendingData?.withdraws?.map((item, id) => {
                        let createdAt = new Date(item?.createdAt); // Parse the createdAt date string
                        let formattedDate = createdAt.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }); // Format the date as "MM/DD/YYYY"
                        let formattedTime = createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Format the time as "HH:MM:SS"

                        return (
                          <div className="parent one" key={id}>
                            <div className="first">
                              <div class="example">
                                <label class="checkbox-button">
                                  <input type="checkbox" class="checkbox-button__input" id={`choice1-${id}`} name="choice1" />
                                  <span class="checkbox-button__control"></span>
                                  <span class="checkbox-button__label"></span>
                                </label>
                              </div>
                            </div>
                            <div className="second">
                              <h4>{formattedDate}</h4>
                              <p>{formattedTime}</p>
                            </div>
                            <div className="third">
                              <h4>{item?.user?.userName}</h4>
                              <p>{item?.user?.walletAddress?.slice(0, 5)}...{item?.user?.walletAddress?.slice(-4)}</p>
                            </div>
                            <div className="fourth">
                              <h4>{item?.amount} <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                              <h4>{item?.hygtVestingAmount} <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                            </div>
                            <div className="five">
                              <h4 className='text-capitalize'>{item?.hygtVestingType}</h4>
                            </div>
                          </div>
                        )
                      })}

                      <div className="pagi">
                        <div className="left">
                        </div>
                        <div className="right">
                          <div className='arrows'>
                            <img onClick={() => offset > 1 ? setOffset(offset - 1) : null} src='\assests\pagi.svg' alt='1mg' className={offset > 1 ? 'img-fluid cp' : 'img-fluid disable'} />

                          </div>
                          <Pagination>
                            <Pagination.Item active>{offset}</Pagination.Item>
                            <Pagination.Item>/</Pagination.Item>
                            <Pagination.Item >{pendingData?.pages}</Pagination.Item>

                          </Pagination>
                          <div className='arrows'>
                            <img onClick={() => offset < pendingData?.pages ? setOffset(offset + 1) : null} src='\assests\pagiright.svg' alt='1mg' className={offset < pendingData?.pages ? 'img-fluid cp' : 'img-fluid disable'} />

                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>

                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>

                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>

                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>

                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>

                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>

                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="pagi formbl">
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
                </>
              )}
              {/* {activeTab === 'approved' && (
                <>
                  <div className="maincard">
                    <div className="parent">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>Time</h4>
                      </div>
                      <div className="third">
                        <h4>User</h4>
                      </div>
                      <div className="fourth">
                        <h4>Claimed Amount</h4>
                      </div>
                      <div className="five">
                        <h4>HYGT Vesting</h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>John Doe</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>No Vesting</h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>Damon Holland</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>3 Months (2.5x) </h4>
                        <h4>314,262.5 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>Bruce Wayne</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>3 Months (2.5x) </h4>
                        <h4>314,262.5 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>Jerry Kelly</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>3 Months (2.5x) </h4>
                        <h4>314,262.5 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>Jack Sparrow</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>3 Months (2.5x) </h4>
                        <h4>314,262.5 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>

                    </div>
                    <div className="pagi ">
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
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="pagi formbl">
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
                </>
              )}
              {activeTab === 'rejected' && (
                <>
                      <div className="maincard">
                    <div className="parent">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>Time</h4>
                      </div>
                      <div className="third">
                        <h4>User</h4>
                      </div>
                      <div className="fourth">
                        <h4>Claimed Amount</h4>
                      </div>
                      <div className="five">
                        <h4>HYGT Vesting</h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>John Doe</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>No Vesting</h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>Damon Holland</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>3 Months (2.5x) </h4>
                        <h4>314,262.5 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>Bruce Wayne</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>3 Months (2.5x) </h4>
                        <h4>314,262.5 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>Jerry Kelly</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>3 Months (2.5x) </h4>
                        <h4>314,262.5 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>

                    </div>
                    <div className="parent one">
                      <div className="first">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="second">
                        <h4>09:12:2023</h4>
                        <p>12:43 </p>
                      </div>
                      <div className="third">
                        <h4>Jack Sparrow</h4>
                        <p>0x12BB....JHE9 </p>
                      </div>
                      <div className="fourth">
                        <h4>524,345.54 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                        <h4>125,705 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>
                      <div className="five">
                        <h4>3 Months (2.5x) </h4>
                        <h4>314,262.5 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid" /></span> </h4>
                      </div>

                    </div>
                    <div className="pagi ">
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
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="formobilecard d-none">
                    <div className="parent">
                      <div className="left">
                        <div class="example">
                          <label class="checkbox-button">
                            <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1" />
                            <span class="checkbox-button__control"></span>
                            <span class="checkbox-button__label"></span>
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        <div className="inner">
                          <div className="innercontent">
                            <h2>Time</h2>
                            <h3>09:12:2023</h3>
                            <p>12:43 </p>
                          </div>
                          <div className="innercontent">
                            <h2>HYGT Vesting</h2>
                            <h3>No Vesting</h3>
                        
                          </div>
                        </div>
                        <div className="inner">
                          <div className="innercontent">
                            <h2>User</h2>
                            <h3>John Doe</h3>
                            <p>0x12BB....JHE9 </p>
                          </div>
                          <div className="innercontent">
                            <h2>Claimed Amount</h2>
                            <h3>524,345.54 <span>HYDT <img src="\Frame.svg" alt="img" className="img-fluid"/></span></h3>
                            <h3>125,705 <span>HYGT <img src="\assests\Group3.svg" alt="img" className="img-fluid"/></span></h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="pagi  formbl ">
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
                </>
              )} */}
            </div>
          </div>

        </section>
      </div>
    </>
  );
};

export default Earn;
