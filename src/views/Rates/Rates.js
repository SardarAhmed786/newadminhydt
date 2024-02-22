import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Envirnoment from '../../utils/environment'
import { useWeb3React } from "@web3-react/core";
import "./rates.scss"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Rates = () => {
    const [activeTab, setActiveTab] = useState('link-1');
    const [levelData, setLevelData] = useState()

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { account } = useWeb3React();
    const accessToken = localStorage.getItem('accessToken');
    const [commisionRates, setCommisionRates] = useState()
    const [hygtComRate, setHygtCommisionRates]=useState()
    function getRefFunc() {

        axios
            .get(Envirnoment.apiUrl + 'commission-rates', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log(response.data.data);
                // You can perform additional actions based on the API response
                setCommisionRates(response?.data?.data)
            })
            .catch((error) => {
                // Handle API errors here
                // toast.error(error.request?.statusText)
            })
            .finally(() => {
                // setIsConfirmLoading(false);
            });

    }
    function getHygtComRateFunc() {

        axios
            .get(Envirnoment.apiUrl + 'commission-rates/hygt', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log(response.data.data);
                // You can perform additional actions based on the API response
                setHygtCommisionRates(response?.data?.data?.hygtCommission)
            })
            .catch((error) => {
                // Handle API errors here
                // toast.error(error.request?.statusText)
            })
            .finally(() => {
                // setIsConfirmLoading(false);
            });

    }
    function updateHydtComRate() {
        let data = {
            [levelData.leveltxt]: levelData.value,
            stakingType: levelData.stakingType
        }
        axios
            .patch(Envirnoment.apiUrl + 'commission-rates', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
               
                toast.success('Commission Rate Upadated Successfully')
                handleClose()
                getRefFunc()
                // You can perform additional actions based on the API response
            })
            .catch((error) => {
                // Handle API errors here
                toast.error(error.request?.statusText)
                console.error('Error checking username availability:', error);
            })
            .finally(() => {
            });
    }
    function updateHygtComRate() {
        if (!hygtComRate || hygtComRate < 0){
            toast.error('Invalid Value')
            return;
        }
        let data = {
            hygtCommission: hygtComRate

        }
        axios
            .patch(Envirnoment.apiUrl + 'commission-rates/hygt', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {

                toast.success('Upadated Successfully')
                getHygtComRateFunc()
                // You can perform additional actions based on the API response
            })
            .catch((error) => {
                // Handle API errors here
                toast.error(error.request?.statusText)
                console.error('Error checking username availability:', error);
            })
            .finally(() => {
            });
    }
    useEffect(() => {
        if (account) {
            getRefFunc()
            getHygtComRateFunc()
        }
    }, [account])
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
                                    {commisionRates?.map((item) => {
                                        return (
                                            <div className="parent one" key={item.id}>
                                                <div className="first">
                                                    <h4>{item.stakingType + ' Month Staking'}</h4>
                                                </div>
                                                <div className="second">
                                                    <h4>{item.levelOne}% <img src="\assests\edit.svg" alt="img" className="img-fluid cp" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelOne, level: '1', leveltxt:  'levelOne' })}} /></h4>
                                                </div>
                                                <div className="third">
                                                    <h4>{item.levelTwo}% <img src="\assests\edit.svg" alt="img" className="img-fluid cp" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelTwo, level: '2', leveltxt:  'levelTwo' })}} /></h4>
                                                </div>
                                                <div className="fourth">
                                                    <h4>{item.levelThree}% <img src="\assests\edit.svg" alt="img" className="img-fluid cp" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelThree, level: '3', leveltxt:  'levelThree' })}} /></h4>
                                                </div>
                                                <div className="five">
                                                    <h4>{item.levelFour}% <img src="\assests\edit.svg" alt="img" className="img-fluid cp" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelFour, level: '4', leveltxt:  'levelFour' })}} /></h4>
                                                </div>
                                                <div className="six">
                                                    <h4>{item.levelFive}% <img src="\assests\edit.svg" alt="img" className="img-fluid cp" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelFive, level: '5', leveltxt:  'levelFive' })}} /></h4>
                                                </div>
                                            </div>
                                        );
                                    })}

                                   
                                </div>
                                {commisionRates?.map((item) => {
                                    return (
                                <div className="formobilecard d-none">
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>One-time Staking</h5>
                                                    <p>{item.stakingType}  Month Staking</p>
                                        </div>
                                        <div className='right'>
                                            <h5>Level 1 (Direct)</h5>
                                                    <p>{item.levelOne}%  <img src="\assests\edit.svg" alt="img" className="img-fluid" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelOne, level: '1', leveltxt: 'levelOne' }) }} /></p>

                                        </div>
                                    </div>
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>Level 2</h5>
                                                    <p>{item.levelTwo}%  <img src="\assests\edit.svg" alt="img" className="img-fluid" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelTwo, level: '2', leveltxt: 'levelTwo' }) }} /></p>
                                        </div>
                                        <div className='right for-width'>
                                            <h5>Level 3</h5>
                                                    <p>{item.levelThree}%  <img src="\assests\edit.svg" alt="img" className="img-fluid" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelThree, level: '3', leveltxt: 'levelThree' }) }} /></p>

                                        </div>
                                    </div>
                                    <div className='mblinner'>
                                        <div className='left'>
                                            <h5>Level 4</h5>
                                                    <p>{item.levelFour}%  <img src="\assests\edit.svg" alt="img" className="img-fluid" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelFour, level: '4', leveltxt: 'levelFour' }) }} /></p>
                                        </div>
                                        <div className='right for-width'>
                                            <h5>Level 5</h5>
                                                    <p>{item.levelFive}%  <img src="\assests\edit.svg" alt="img" className="img-fluid" onClick={() => { handleShow(); setLevelData({ stakingType: item.stakingType, value: item?.levelFive, level: '5', leveltxt: 'levelFive' }) }} /></p>

                                        </div>
                                    </div>
                                </div>
                                    );
                                })}
                            </>
                        )}
                        {activeTab === 'link-2' && (
                            <>
                                <div className='mainheadings'>
                                    <p>HYGT Commission </p>
                                </div>
                                <div className='maininput'>
                                    <input onChange={(e)=>setHygtCommisionRates(e.target.value)} value={hygtComRate} type='text' placeholder='Enter Amount' />
                                    <p>HYGT/HYDT</p>
                                </div>
                                <button onClick={updateHygtComRate} className='save'>Save</button>
                            </>
                        )}
                    </div>
                </section>
                {console.log(levelData)}
                <Modal className='edit' show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{levelData?.stakingType} Month Staking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='main'>
                            <p>Level {levelData?.level} Direct</p>
                            <input value={levelData?.value} onChange={(e)=>{setLevelData({...levelData, value: e.target.value})}} type='text' placeholder={levelData?.value + '%'} />
                        </div>
                        <div className='endbtn'>
                            <button onClick={handleClose}>Cancel</button>
                            <button onClick={updateHydtComRate}>Save</button>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        </>
    )
}

export default Rates