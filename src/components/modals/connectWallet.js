const ConnectWallet = ({connectMetamask, trustWallet}) => {
  return (
    <div className="modal-dialog pos-modal" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <div className="row">
            <div className="col-sm-12 p-0">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 className="white text-dark modal-heading pt-4 text-center">
                CONNECT WALLET
              </h3>
              <div className="pop-content ptb20">
                <ul className="">
                  <li className="">
                    <div className="">
                      <button
                        className="inner-tile grey"
                        data-dismiss="modal"
                        type="button"
                        onClick={connectMetamask}
                      >
                        <img
                          src="\opencanvas-assets\pop-up\connect-wallet\metamask.svg"
                          className="img-fluid"
                          alt=""
                        />
                        &nbsp;&nbsp;&nbsp;
                        <span className="mr-4">MetaMask</span>
                      </button>
                    </div>
                  </li>
                  <li className="">
                    <div className="">
                      <button
                        className="inner-tile grey"
                        data-dismiss="modal"
                        type="button"
                        onClick={trustWallet}
                      >
                        <img
                          src="\opencanvas-assets\pop-up\connect-wallet\trust-wallet.svg"
                          className="img-fluid"
                          alt=""
                        />
                        &nbsp;&nbsp;&nbsp;
                        <span>WalletConnect</span>
                      </button>
                    </div>
                  </li>
                </ul>
                <div className="pt-4">
                  <a className=".grey text-dark" href="/">
                    By connecting, I accept OpenCanvas Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
