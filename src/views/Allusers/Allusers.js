import React from 'react'
import "./allusers.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import { Nav } from 'react-bootstrap';
const Allusers = () => {
    return (
        <>
            <div className="content">
                <section className='mainuser'>
                    <div className='row'>
                        <div className='col-xl-12 col-12 p-0'>
                            <div className="mainhead">
                                <h2>All Users</h2>
                            </div>
                            <div className='userparent'>
                                <div className='left'>
                                    <input type='text' placeholder='Search' />
                                    <img src='\assests\search-normal.svg' alt='img' className='img-fluid search' />
                                    <div className='dropbtn'>
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                Wallet
                                                <img src='\assests\arrow-down.svg' alt='img' className='dropimg img-fluid' />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Wallet</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Username</Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className='right'>
                                    <button>Search</button>
                                </div>
                            </div>
                            <div className="maincard">
                                <div className="parent">
                                    <div className="first">
                                        <h4>User</h4>
                                    </div>
                                    <div className="second">
                                        <h4>Registration Date</h4>
                                    </div>
                                    <div className="third">
                                        <h4>Total HYDT Staked</h4>
                                    </div>
                                    <div className="fourth">
                                        <h4>Commission Earned</h4>
                                    </div>
                                    <div className="five">
                                        <h4>Level 1 Referral</h4>
                                    </div>
                                    <div className="six">
                                        <h4>Indirect Referral</h4>
                                    </div>
                                </div>
                                <div className="parent one">
                                    <div className="first">
                                        <h4>John Doe</h4>
                                        <p>0x12BB....JHE9 </p>
                                    </div>
                                    <div className="second">
                                        <h4>Jan 1, 2024</h4>

                                    </div>
                                    <div className="third">
                                        <h4>1,000 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                                    </div>
                                    <div className="fourth">
                                        <h4>100<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>

                                    </div>
                                    <div className="five">
                                        <h4>100</h4>
                                    </div>
                                    <div className="six">
                                        <h4>100</h4>
                                    </div>
                                </div>
                                <div className="parent one">
                                    <div className="first">
                                        <h4>John Doe</h4>
                                        <p>0x12BB....JHE9 </p>
                                    </div>
                                    <div className="second">
                                        <h4>Jan 1, 2024</h4>

                                    </div>
                                    <div className="third">
                                        <h4>1,000 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                                    </div>
                                    <div className="fourth">
                                        <h4>100<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>

                                    </div>
                                    <div className="five">
                                        <h4>100</h4>
                                    </div>
                                    <div className="six">
                                        <h4>100</h4>
                                    </div>
                                </div>
                                <div className="parent one">
                                    <div className="first">
                                        <h4>John Doe</h4>
                                        <p>0x12BB....JHE9 </p>
                                    </div>
                                    <div className="second">
                                        <h4>Jan 1, 2024</h4>

                                    </div>
                                    <div className="third">
                                        <h4>1,000 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                                    </div>
                                    <div className="fourth">
                                        <h4>100<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>

                                    </div>
                                    <div className="five">
                                        <h4>100</h4>
                                    </div>
                                    <div className="six">
                                        <h4>100</h4>
                                    </div>
                                </div>
                                <div className="parent one">
                                    <div className="first">
                                        <h4>John Doe</h4>
                                        <p>0x12BB....JHE9 </p>
                                    </div>
                                    <div className="second">
                                        <h4>Jan 1, 2024</h4>

                                    </div>
                                    <div className="third">
                                        <h4>1,000 <span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>
                                    </div>
                                    <div className="fourth">
                                        <h4>100<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></h4>

                                    </div>
                                    <div className="five">
                                        <h4>100</h4>
                                    </div>
                                    <div className="six">
                                        <h4>100</h4>
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
                            <div className="formobilecard d-none">
                                <div className='parents'>
                                    <div className='lefts'>
                                        <h3>User</h3>
                                        <p>Damon Holland</p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Wallet Address</h3>
                                        <p>0x12BB....JHE9</p>
                                    </div>
                                </div>
                                <div className='parents'>
                                    <div className='lefts'>
                                        <h3>Registration Date</h3>
                                        <p>Jan 1, 2024</p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Total HYDT Staked</h3>
                                        <p>1000<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></p>
                                    </div>
                                </div>
                                <div className='parents'>
                                    <div className='lefts'>

                                        <h3>Commission Earned</h3>
                                        <p>100<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Level 1 Referral</h3>
                                        <p>100</p>
                                    </div>
                                </div>
                                <div className='parents'>

                                    <div className='rights'>
                                        <h3>Indirect Referral</h3>
                                        <p>500</p>
                                    </div>
                                </div>
                            </div>
                            <div className="formobilecard d-none">
                                <div className='parents'>
                                    <div className='lefts'>
                                        <h3>User</h3>
                                        <p>Damon Holland</p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Wallet Address</h3>
                                        <p>0x12BB....JHE9</p>
                                    </div>
                                </div>
                                <div className='parents'>
                                    <div className='lefts'>
                                        <h3>Registration Date</h3>
                                        <p>Jan 1, 2024</p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Total HYDT Staked</h3>
                                        <p>1000<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></p>
                                    </div>
                                </div>
                                <div className='parents'>
                                    <div className='lefts'>

                                        <h3>Commission Earned</h3>
                                        <p>100<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Level 1 Referral</h3>
                                        <p>100</p>
                                    </div>
                                </div>
                                <div className='parents'>

                                    <div className='rights'>
                                        <h3>Indirect Referral</h3>
                                        <p>500</p>
                                    </div>
                                </div>
                            </div>
                            <div className="formobilecard d-none">
                                <div className='parents'>
                                    <div className='lefts'>
                                        <h3>User</h3>
                                        <p>Damon Holland</p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Wallet Address</h3>
                                        <p>0x12BB....JHE9</p>
                                    </div>
                                </div>
                                <div className='parents'>
                                    <div className='lefts'>
                                        <h3>Registration Date</h3>
                                        <p>Jan 1, 2024</p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Total HYDT Staked</h3>
                                        <p>1000<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></p>
                                    </div>
                                </div>
                                <div className='parents'>
                                    <div className='lefts'>

                                        <h3>Commission Earned</h3>
                                        <p>100<span>HYDT <img src="\assests\Group3.svg" alt="img" className="img-fluid" /></span></p>
                                    </div>
                                    <div className='rights'>
                                        <h3>Level 1 Referral</h3>
                                        <p>100</p>
                                    </div>
                                </div>
                                <div className='parents'>

                                    <div className='rights'>
                                        <h3>Indirect Referral</h3>
                                        <p>500</p>
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
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Allusers