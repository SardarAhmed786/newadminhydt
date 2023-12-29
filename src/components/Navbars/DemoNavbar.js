import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "../modals/connectWallet";
import useAuth from "../../hooks/useAuth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";
import { toast } from "react-toastify";

function Header(props) {
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  // const images = importAll(
  //   require.context("assets/img/dashboardimg", false, /\.(png|jpe?g|svg)$/)
  // ); 
  const [isOpen, setIsOpen] = React.useState(false);
  const [brandName, setbrandName] = React.useState();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const { account } = useWeb3React();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        // brandname = prop.name;
        setbrandName(prop.name);
        // console.log(brandName)
      }
      return null;
    });
  };
  useEffect(() => {
    getBrand();
  });
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    // sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color /transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
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
  const connectwallet = () => {
    if (account) {
      connectMetamask();
    } else {
      window.$("#exampleModalLong").modal("show");
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);



  const [showdis, setShowdis] = useState(false);

  const handleClosedis = () => setShowdis(false);
  const handleShowdis = () => setShowdis(true);
  console.log("ddddd",account);

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <div className="main-navbar">
      <Navbar
        color={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? ""
            : color
        }
        expand="lg"
        className={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid className="main-header-top-change p-0">
          <div className="logo d-none mobile-show-logo">
            <img src="\logo.svg" alt="img" className="img-fluid" />
          </div>
          <div className="navbar-wrapper">
            <img src="\assests\wallet-connect.svg" alt="img" className="img-fluid mr-2 wallet-btn-sm d-none" onClick={handleShowdis} />
            <div className="navbar-toggle">
              <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
              >
                <img src="\menu-bar.svg" alt="img" className="img-fluid" />
                {/* <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" /> */}
              </button>
            </div>
            {/* <NavbarBrand href="/">{brandName}</NavbarBrand> */}
          </div>
          {/* <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler> */}
          {console.log("sssssss",account)}
          <Collapse isOpen={isOpen} navbar className="justify-content-end">
            <div className="twice-btn">
              {/* <button
                type="button"
                className="btn-transparent mr-4"
              >
                <img src="\assests\buttonsvgs\buyhydt.svg" alt="img" className="img-fluid mr-2" />
                Buy HYDT
              </button> */}
              <button
                type="button"
                className="btn-wallet mr-4"
                onClick={() => { account ? setShowdis(true) : handleShow() }}
              >
                <img src="\assests\buttonsvgs\connectwallet.svg" alt="img" className="img-fluid mr-2" />
                {account ? "Disconnect Wallet" : "Connect Wallet"}
              </button>
            </div>
          </Collapse>
        </Container>
      </Navbar>

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

      {/* showdis */}
      <Offcanvas className="disconnect-modal" placement="bottom" show={showdis} onHide={handleClosedis}>
        <Offcanvas.Header closeButton onClick={() => setShowdis(false)}>
          <Offcanvas.Title>Wallet</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="main-content">
            <div className="option-field">
              <h6>Wallet Address</h6>
              <div className="copy-wallet">
                <p className="text-light">{account}</p>
                <img src="\assests\copy.svg" alt="img" className="img-fluid" />
              </div>
              <div className="disconnect-btn">
                <button onClick={() => { setShowdis(false); connectMetamask() }}>Disconnect Wallet</button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

    </div>
  );
}

export default Header;
