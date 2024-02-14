import React, { useState } from 'react'
import "./rates.scss"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Nav } from 'react-bootstrap';

const Rates = () => {
    const [activeTab, setActiveTab] = useState('link-1');
    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="content">
                <section className='main-rates'>
                    <div className='row'>
                        <div className='col-xl-12 col-12 p-0'>
                            <div className="mainhead">
                                <h2>Commission Rates</h2>
                            </div>
                        </div>
                        <div className='mainssss'>
                            <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">HYDT Commission Rate</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">HYGT Commission Rate</Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </div>

                        {activeTab === 'link-1' && (
                            <>
                                <div className="maincard">
                                    <div className="parent">
                                        <div className="first">
                                            <h4>One-time Staking</h4>
                                        </div>
                                        <div className="second">
                                            <h4>Level 1 (Direct)</h4>
                                        </div>
                                        <div className="third">
                                            <h4>Level 2</h4>
                                        </div>
                                        <div className="fourth">
                                            <h4>Level 3</h4>
                                        </div>
                                        <div className="five">
                                            <h4>Level 4</h4>
                                        </div>
                                        <div className="six">
                                            <h4>Level 5</h4>
                                        </div>
                                    </div>
                                    <div className="parent one">
                                        <div className="first">
                                            <h4>12 Month Staking</h4>

                                        </div>
                                        <div className="second">
                                            <h4>4%  <img src="\assests\edit.svg" alt="img" className="img-fluid" onClick={handleShow} /></h4>

                                        </div>
                                        <div className="third">
                                            <h4>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                        <div className="fourth">
                                            <h4>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>

                                        </div>
                                        <div className="five">
                                            <h4>0.5% <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                        <div className="six">
                                            <h4>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                    </div>
                                    <div className="parent one">
                                        <div className="first">
                                            <h4>12 Month Staking</h4>

                                        </div>
                                        <div className="second">
                                            <h4>4%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>

                                        </div>
                                        <div className="third">
                                            <h4>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                        <div className="fourth">
                                            <h4>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>

                                        </div>
                                        <div className="five">
                                            <h4>0.5% <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                        <div className="six">
                                            <h4>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                    </div>
                                    <div className="parent one">
                                        <div className="first">
                                            <h4>12 Month Staking</h4>

                                        </div>
                                        <div className="second">
                                            <h4>4%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>

                                        </div>
                                        <div className="third">
                                            <h4>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                        <div className="fourth">
                                            <h4>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>

                                        </div>
                                        <div className="five">
                                            <h4>0.5% <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                        <div className="six">
                                            <h4>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="formobilecard d-none">
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>One-time Staking</h5>
                                            <p>12 Month Staking</p>
                                        </div>
                                        <div className='right'>
                                            <h5>Level 1 (Direct)</h5>
                                            <p>4%  <img src="\assests\edit.svg" alt="img" className="img-fluid" onClick={handleShow} /></p>

                                        </div>
                                    </div>
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>Level 2</h5>
                                            <p>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>
                                        </div>
                                        <div className='right for-width'>
                                            <h5>Level 3</h5>
                                            <p>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>

                                        </div>
                                    </div>
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>Level 4</h5>
                                            <p>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>
                                        </div>
                                        <div className='right for-width'>
                                            <h5>Level 5</h5>
                                            <p>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>

                                        </div>
                                    </div>
                                </div>
                                <div className="formobilecard d-none">
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>One-time Staking</h5>
                                            <p>12 Month Staking</p>
                                        </div>
                                        <div className='right'>
                                            <h5>Level 1 (Direct)</h5>
                                            <p>4%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>

                                        </div>
                                    </div>
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>Level 2</h5>
                                            <p>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>
                                        </div>
                                        <div className='right for-width'>
                                            <h5>Level 3</h5>
                                            <p>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>

                                        </div>
                                    </div>
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>Level 4</h5>
                                            <p>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>
                                        </div>
                                        <div className='right for-width'>
                                            <h5>Level 5</h5>
                                            <p>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>

                                        </div>
                                    </div>
                                </div>
                                <div className="formobilecard d-none">
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>One-time Staking</h5>
                                            <p>12 Month Staking</p>
                                        </div>
                                        <div className='right'>
                                            <h5>Level 1 (Direct)</h5>
                                            <p>4%  <img src="\assests\edit.svg" alt="img" className="img-fluid" onClick={handleShow} /></p>

                                        </div>
                                    </div>
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>Level 2</h5>
                                            <p>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>
                                        </div>
                                        <div className='right for-width'>
                                            <h5>Level 3</h5>
                                            <p>1%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>

                                        </div>
                                    </div>
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>Level 4</h5>
                                            <p>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>
                                        </div>
                                        <div className='right for-width'>
                                            <h5>Level 5</h5>
                                            <p>0.5%  <img src="\assests\edit.svg" alt="img" className="img-fluid" /></p>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeTab === 'link-2' && (
                            <>
                                <div className='mainheadings'>
                                    <p>HYGT Commission </p>
                                </div>
                                <div className='maininput'>
                                    <input type='text' placeholder='1 ' />
                                    <p>HYGT/HYDT</p>
                                </div>
                                <button className='save'>Save</button>
                            </>
                        )}
                    </div>
                </section>

                <Modal className='edit' show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>12 Month Staking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='main'>
                            <p>Level 1 Direct</p>
                            <input type='text' placeholder='5%' />
                        </div>
                        <div className='endbtn'>
                            <button>Cancel</button>
                            <button>Save</button>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        </>
    )
}

export default Rates