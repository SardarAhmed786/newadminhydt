// import React from "react";
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./style.scss";
import { useHistory } from "react-router-dom";

import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import logo from "../../assets/img/logo.svg";
import routes from "routes.js";
import { Modal } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import useAuth from "hooks/useAuth";

var ps;

function Sidebar(props) {
  const history = useHistory();
  const sidebar = React.useRef();
  const [brandName, setbrandName] = useState();
  const { account } = useWeb3React();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const logoutK = () => {
    localStorage.setItem("openCanvasToken", null);
    history.push("/adminlogin");
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const getBrand = () => {
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        // brandname = prop.name;
        setbrandName(prop.name);
      }
      return null;
    });
  };

  useEffect(() => {
    getBrand();
  });
  const { login, logout } = useAuth();
  const connectMetamask = () => {
    localStorage.setItem("connectorId", "injected");
    if (account) {
      logout();
    } else {
      login("injected");
    }
  };
  const trustWallet = async () => {
    localStorage.setItem("connectorId", "walletconnect");
    if (account) {
      logout();
    } else {
      login("walletconnect");
    }
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
  };


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);



  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo for-mobilesidebar-sm">
        <Link to="/admin/dashboard" className="simple-text logo-mini ">
          <div className="logo-img text-left">
            <img className="px-2" src={logo} alt="react-logo" />
          </div>
        </Link>
        <img src="\assests\buttonsvgs\close-icon.svg" alt="img" className="img-fluid img-close d-none" onClick={() => openSidebar()} />
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <li>
            <Link
              to={`/admin/dashboard`}
              className={
                "nav-link " + (brandName === "Dashboard" ? "active" : "")
              }
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="iconns">
                <path d="M19.77 11.25H15.73C13.72 11.25 12.75 10.36 12.75 8.52V3.98C12.75 2.14 13.73 1.25 15.73 1.25H19.77C21.78 1.25 22.75 2.14 22.75 3.98V8.51C22.75 10.36 21.77 11.25 19.77 11.25ZM15.73 2.75C14.39 2.75 14.25 3.13 14.25 3.98V8.51C14.25 9.37 14.39 9.74 15.73 9.74H19.77C21.11 9.74 21.25 9.36 21.25 8.51V3.98C21.25 3.12 21.11 2.75 19.77 2.75H15.73Z" fill="#555555" />
                <path d="M19.77 22.75H15.73C13.72 22.75 12.75 21.77 12.75 19.77V15.73C12.75 13.72 13.73 12.75 15.73 12.75H19.77C21.78 12.75 22.75 13.73 22.75 15.73V19.77C22.75 21.77 21.77 22.75 19.77 22.75ZM15.73 14.25C14.55 14.25 14.25 14.55 14.25 15.73V19.77C14.25 20.95 14.55 21.25 15.73 21.25H19.77C20.95 21.25 21.25 20.95 21.25 19.77V15.73C21.25 14.55 20.95 14.25 19.77 14.25H15.73Z" fill="#555555" />
                <path d="M8.27 11.25H4.23C2.22 11.25 1.25 10.36 1.25 8.52V3.98C1.25 2.14 2.23 1.25 4.23 1.25H8.27C10.28 1.25 11.25 2.14 11.25 3.98V8.51C11.25 10.36 10.27 11.25 8.27 11.25ZM4.23 2.75C2.89 2.75 2.75 3.13 2.75 3.98V8.51C2.75 9.37 2.89 9.74 4.23 9.74H8.27C9.61 9.74 9.75 9.36 9.75 8.51V3.98C9.75 3.12 9.61 2.75 8.27 2.75H4.23Z" fill="#555555" />
                <path d="M8.27 22.75H4.23C2.22 22.75 1.25 21.77 1.25 19.77V15.73C1.25 13.72 2.23 12.75 4.23 12.75H8.27C10.28 12.75 11.25 13.73 11.25 15.73V19.77C11.25 21.77 10.27 22.75 8.27 22.75ZM4.23 14.25C3.05 14.25 2.75 14.55 2.75 15.73V19.77C2.75 20.95 3.05 21.25 4.23 21.25H8.27C9.45 21.25 9.75 20.95 9.75 19.77V15.73C9.75 14.55 9.45 14.25 8.27 14.25H4.23Z" fill="#555555" />
              </svg>


              <p className="">Dashboard</p>
            </Link>
          </li>
          <li>
            <Link
              to={`/admin/earn`}
              className={
                "nav-link " + (brandName === "Earn" ? "active" : "")
              }
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="iconns">
                <path d="M22.3984 7.58084C22.1504 7.35796 21.8471 7.21465 21.5243 7.16785C21.2015 7.12106 20.8727 7.17274 20.5769 7.31679C20.2811 7.46084 20.0305 7.69122 19.855 7.9807C19.6794 8.27017 19.5861 8.60662 19.5861 8.95024V12.5237C19.4677 12.4812 19.3452 12.4525 19.2209 12.4381C18.9683 12.409 18.7128 12.4403 18.4732 12.5296C18.2337 12.619 18.0163 12.7641 17.8373 12.9542L13.6801 17.3366C13.3918 17.6389 13.1632 17.9985 13.0076 18.3945C12.852 18.7906 12.7724 19.2153 12.7734 19.644V22.4109C12.7734 22.5671 12.8323 22.717 12.937 22.8275C13.0418 22.9379 13.1839 23 13.332 23C13.4802 23 13.6223 22.9379 13.727 22.8275C13.8318 22.717 13.8906 22.5671 13.8906 22.4109V19.644C13.8899 19.37 13.9408 19.0987 14.0402 18.8456C14.1396 18.5925 14.2856 18.3627 14.4698 18.1695L18.6271 13.7853C18.7362 13.6702 18.8842 13.6056 19.0385 13.6056C19.1928 13.6056 19.3408 13.6702 19.4499 13.7853C19.559 13.9004 19.6203 14.0564 19.6203 14.2192C19.6203 14.3819 19.559 14.538 19.4499 14.6531L17.0402 17.1943C16.9352 17.3048 16.8761 17.4548 16.876 17.6112C16.8758 17.7677 16.9346 17.9178 17.0394 18.0285C17.1442 18.1393 17.2864 18.2016 17.4347 18.2018C17.5831 18.2019 17.7254 18.14 17.8304 18.0295L20.2401 15.4882C20.4092 15.3114 20.541 15.0989 20.6269 14.8646C20.7127 14.6303 20.7506 14.3796 20.7381 14.1288C20.7397 14.1137 20.7406 14.0986 20.7407 14.0835L20.7055 8.95206C20.7049 8.80435 20.7545 8.6613 20.8453 8.54883C20.9361 8.43636 21.0621 8.36191 21.2005 8.33895C21.2844 8.32468 21.3704 8.32977 21.4523 8.35387C21.5342 8.37797 21.6102 8.42051 21.6751 8.47857C21.7399 8.53662 21.7921 8.60881 21.8279 8.69016C21.8638 8.77151 21.8825 8.86008 21.8828 8.94979V15.5965C21.8836 15.928 21.8221 16.2563 21.7018 16.5626C21.5815 16.8688 21.4048 17.1468 21.182 17.3806L17.8364 20.9087C17.7317 21.0192 17.6728 21.169 17.6727 21.3252V22.4105C17.6727 22.5667 17.7316 22.7165 17.8363 22.827C17.9411 22.9375 18.0832 22.9995 18.2313 22.9995C18.3795 22.9995 18.5215 22.9375 18.6263 22.827C18.7311 22.7165 18.7899 22.5667 18.7899 22.4105V21.5699L21.9722 18.2139C22.2991 17.8709 22.5582 17.463 22.7347 17.0138C22.9111 16.5645 23.0013 16.0828 23 15.5965V8.94979C22.9999 8.68925 22.946 8.43187 22.8421 8.19548C22.7382 7.95909 22.5868 7.74936 22.3984 7.58084ZM5.21095 21.5699V22.4109C5.21095 22.5671 5.2698 22.717 5.37455 22.8275C5.47931 22.9379 5.62139 23 5.76954 23C5.91769 23 6.05977 22.9379 6.16452 22.8275C6.26928 22.717 6.32813 22.5671 6.32813 22.4109V21.3256C6.32808 21.1694 6.26919 21.0196 6.16442 20.9092L2.81802 17.381C2.59511 17.1472 2.41839 16.8691 2.2981 16.5628C2.1778 16.2565 2.11631 15.9281 2.1172 15.5965V8.94979C2.11718 8.85994 2.13566 8.77115 2.17136 8.68956C2.20705 8.60797 2.25912 8.53553 2.32396 8.47724C2.38879 8.41894 2.46486 8.37618 2.54689 8.35192C2.62893 8.32765 2.71499 8.32245 2.79911 8.33669C2.93756 8.35955 3.06365 8.43396 3.15454 8.54644C3.24543 8.65892 3.2951 8.80201 3.29454 8.94979L3.26403 14.0871C3.26403 14.0871 3.26403 14.0871 3.26403 14.0894C3.24595 14.3462 3.28088 14.6042 3.36641 14.8454C3.45194 15.0867 3.58603 15.3055 3.75946 15.4869L6.16958 18.0295C6.2751 18.1358 6.41589 18.1943 6.56182 18.1926C6.70776 18.1908 6.84724 18.1289 6.95044 18.0201C7.05364 17.9112 7.11235 17.7641 7.11401 17.6102C7.11568 17.4563 7.06016 17.3079 6.95934 17.1966L4.54966 14.6535C4.44054 14.5385 4.37924 14.3824 4.37924 14.2196C4.37924 14.0569 4.44054 13.9008 4.54966 13.7858C4.65877 13.6707 4.80677 13.606 4.96108 13.606C5.1154 13.606 5.26339 13.6707 5.37251 13.7858L9.52973 18.1699C9.71395 18.363 9.86004 18.5927 9.95953 18.8458C10.059 19.0988 10.11 19.3701 10.1094 19.644V22.4109C10.1094 22.5671 10.1682 22.717 10.273 22.8275C10.3777 22.9379 10.5198 23 10.668 23C10.8161 23 10.9582 22.9379 11.063 22.8275C11.1677 22.717 11.2266 22.5671 11.2266 22.4109V19.644C11.2277 19.2153 11.1481 18.7907 10.9926 18.3946C10.837 17.9985 10.6086 17.6389 10.3204 17.3366L6.1627 12.9542C5.9834 12.7638 5.76568 12.6185 5.52575 12.5292C5.28583 12.4398 5.02988 12.4087 4.77696 12.4381C4.65261 12.4525 4.53014 12.4812 4.41173 12.5237V8.94979C4.41173 8.47267 4.232 8.01509 3.91209 7.67772C3.59218 7.34034 3.15829 7.15081 2.70587 7.15081C2.25345 7.15081 1.81956 7.34034 1.49965 7.67772C1.17974 8.01509 1.00001 8.47267 1.00001 8.94979V15.5965C0.998726 16.0828 1.0889 16.5645 1.26533 17.0138C1.44175 17.463 1.70092 17.8709 2.02782 18.2139L5.21095 21.5699ZM12.1431 6.88934L12.125 6.88481C11.0839 6.63377 11.0839 6.18153 11.0839 6.03335C11.0839 5.45831 11.5591 5.19639 12.0004 5.19639C12.1812 5.19616 12.3579 5.25237 12.5084 5.35793C12.6589 5.46349 12.7764 5.61368 12.8461 5.78956C12.9034 5.93378 13.0127 6.04807 13.1499 6.10731C13.2871 6.16654 13.4411 6.16585 13.5778 6.1054C13.7146 6.04495 13.8229 5.92968 13.8791 5.78496C13.9353 5.64024 13.9346 5.47791 13.8773 5.3337C13.7596 5.03676 13.5799 4.77165 13.3516 4.5581C13.1232 4.34454 12.8522 4.18804 12.5586 4.10024V3.58909C12.5586 3.43285 12.4997 3.28302 12.395 3.17254C12.2902 3.06206 12.1481 3 12 3C11.8519 3 11.7098 3.06206 11.605 3.17254C11.5003 3.28302 11.4414 3.43285 11.4414 3.58909V4.08755C10.5713 4.31639 9.96629 5.07586 9.96629 6.03109C9.96629 6.60386 10.2125 7.62298 11.8569 8.02492L11.875 8.02945C12.9161 8.2805 12.9161 8.73274 12.9161 8.88137C12.9161 9.45641 12.4409 9.71833 11.9996 9.71833C11.8188 9.71856 11.6421 9.66235 11.4916 9.55679C11.3411 9.45122 11.2236 9.30104 11.1539 9.12516C11.0966 8.98094 10.9873 8.86664 10.8501 8.80741C10.7129 8.74818 10.5589 8.74887 10.4222 8.80932C10.2854 8.86977 10.1771 8.98503 10.1209 9.12976C10.0647 9.27448 10.0654 9.4368 10.1227 9.58102C10.24 9.87855 10.4196 10.1443 10.6479 10.3584C10.8763 10.5725 11.1475 10.7295 11.4414 10.8177V11.3283C11.4414 11.4846 11.5003 11.6344 11.605 11.7449C11.7098 11.8554 11.8519 11.9174 12 11.9174C12.1481 11.9174 12.2902 11.8554 12.395 11.7449C12.4997 11.6344 12.5586 11.4846 12.5586 11.3283V10.8299C13.4283 10.6006 14.0324 9.84158 14.0324 8.8868C14.0333 8.31176 13.7871 7.29264 12.1431 6.88934Z" fill="#555555" />
                <path d="M19 8.00023C19 4.14017 15.8599 1 12 1C8.14007 1 5 4.14017 5 8.00023C5 11.8603 8.14007 15 12 15C15.8599 15 19 11.8598 19 8.00023ZM12 13.8214C10.8486 13.8214 9.72309 13.4799 8.76576 12.8402C7.80842 12.2005 7.06228 11.2913 6.62169 10.2275C6.18109 9.16371 6.06584 7.99316 6.29049 6.86387C6.51515 5.73458 7.06963 4.69728 7.88381 3.88313C8.69799 3.06899 9.73531 2.51457 10.8646 2.28999C11.9938 2.06542 13.1644 2.18077 14.2281 2.62146C15.2918 3.06215 16.2009 3.80839 16.8405 4.7658C17.4801 5.72322 17.8215 6.84881 17.8214 8.00023C17.8196 9.54361 17.2057 11.0233 16.1143 12.1146C15.023 13.2059 13.5433 13.8197 12 13.8214Z" fill="#555555" />
              </svg>

              <p className="">Commissions</p>
            </Link>
          </li>


          <li>
            <Link
              to={`/admin/earn`}
              className={
                "nav-link " + (brandName === "btn" ? "active" : "")
              }
            >

              <button onClick={handleShow} className="connect d-none" centered><img src="\assests\buttonsvgs\connectwallet.svg" alt="img" className="img-fluid"/>Connect Wallet</button>
            </Link>
          </li>


        </Nav>
        <div className="bottom-copyright">
          <button className="delbtn">Disconnect Wallet</button>
        </div>

        
      </div>

      <Modal className="connectwallet-modal" show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className="main-body">
            <h4>Please connect your wallet to continue</h4>
            <h6>Required network <img src="\assests\buttonsvgs\bnb-icon.svg" alt="img" className="img-fluid mx-2" />BNB Chain</h6>
            <button
              type="button"
              className="btn-wallet m-auto block w-100"
              onClick={() => {
                handleShow1()
                handleClose()
              }}
            >
              <img src="\assests\buttonsvgs\connectwallet.svg" alt="img" className="img-fluid mr-2" />
              {account ? "Disconnect Wallet" : "Connect Wallet"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal className="connectwallet-modal" show={show1} onHide={handleClose1} centered>
        <Modal.Header closeButton>
          <Modal.Title>Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="connect-btns">
            <button onClick={()=>{connectMetamask(); setShow1(false)}}><img src="\assests\buttonsvgs\metamask.svg" alt="img" className="img-fluid mr-2" />Metamask</button>
            <button onClick={trustWallet}><img src="\assests\buttonsvgs\walletconnect.svg" alt="img" className="img-fluid mr-2" />WalletConnect</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Sidebar;
