import React, { useState, useEffect } from "react";
import "./mintredeem.scss";
import Environment from "../../utils/environment";
import useWeb3 from "../../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const Mintredeem = () => {
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const web3 = useWeb3();
  const [paginate, setPaginate] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { account } = useWeb3React();
  const getMintRedeem = () => {
    // setLoader(true)
    console.log("paginate",paginate);
    var data = JSON.stringify({
      query: `query 
      MyQuery {calls(orderBy: blockTimestamp, orderDirection: desc, first: 7, skip: ${paginate}) {
        blockTimestamp
        type
        amountHYDT
        callingPrice
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
        console.log("mint/redeem", response?.data?.data?.calls);
        setDisplayData(response?.data?.data?.calls);

        const lastTranTime =  response?.data?.data?.calls[0]?.blockTimestamp * 1000;
        var newdate = new Date().getTime();
        console.log("darerer",newdate-lastTranTime); 
        var new1111 = (newdate/1000-lastTranTime/1000);
        console.log("darerer123213",parseFloat(new1111).toFixed(5));
        var new2222 =parseFloat(new1111).toFixed(5);
        // for (let i =0; lastTranTime < newdate ; i++){
        //   console.log("newdate",)
        // }
        var date1 = lastTranTime.toLocaleDateString("en-GB");
        var date2 = lastTranTime.toLocaleTimeString("default");
        const unixDate = date1.replaceAll("/", ":");
        var date = new Date();
        // var date = new Date(item?.blockTimestamp * 1000);
        // if(response?.data?.data?.calls){
        // setRawData(current => ['Zoey', ...current]);
        // }

      //   if(displayData){
      //   displayData.unshift({
      //     amountHYDT: "8190327861017436",
      //     blockTimestamp: "1680568248",
      //     callingPrice: "1584094304475814654",
      //     type: "Mint",
      //  })
      //   console.log("151514",displayData);
      //   }

        // array1.unshift(4, 5)
        console.log("Cccccc",response?.data?.data?.calls);
        setPaginate(response?.data?.data?.calls.length);
      })
      .catch(function (error) {
        // setLoader(false)
      });
  };
  console.log("rawDatarawData",rawData);
  const handleChangePage = (event, newPage) => {
    if(newPage == 1)
    {
      setPaginate(0);
    }
    console.log("ggggggggggg",(newPage-1)*7);
    setCurrentPage(newPage);
  };
  useEffect(() => {
      getMintRedeem();
  }, [account, currentPage]);

  return (
    <>
      <div className="content">
        <section className="product">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-xl-12 col-12 p-0">
                <div className="parent-heading">
                  <h4>Mint/Redeem</h4>
                </div>
                <div className="tableresponsive">
                  <div className="row">
                    <div className="col-12 main_history p-0">
                      <div className="historyss">
                        <h4 className="headng">History</h4>
                      </div>
                      {displayData.map((item) => {
                        var date = new Date(item?.blockTimestamp * 1000);
                        var date1 = date.toLocaleDateString("en-GB");
                        var date2 = date.toLocaleTimeString("default");
                        const unixDate = date1.replaceAll("/", ":");

                        return (
                          <>
                            <div className="row main_rowdiv">
                              <div className="col-xl-3 col-md-6 col-6  p-0 ">
                                <div className="mainrowdiv">
                                  <p className="event">Time of Event</p>
                                  <h6 className="time_date">
                                    {date2} {unixDate}
                                  </h6>
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6 col-6  p-0 ">
                                <div className="mainrowdiv">
                                  <p className="event">Type</p>
                                  <h6 className="time_date">{item?.type}</h6>
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6 col-6  p-0 ">
                                <div className="mainrowdiv">
                                  <p className="event">HYDT Amount</p>
                                  <h6 className="time_date">
                                    {item?.amountHYDT
                                      ? parseFloat(web3.utils.fromWei(
                                          item?.amountHYDT,
                                          "ether"
                                        )).toFixed(5)
                                      : 0}
                                    <span className="mute">
                                      HYDT{" "}
                                      <img
                                        src="\minticon.svg"
                                        className="img-fluid ml-2x"
                                      />
                                    </span>
                                  </h6>
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6 col-6  p-0 ">
                                <div className="mainrowdiv">
                                  <p className="event">Price in BUSD</p>
                                  <h6 className="time_date">
                                    {item?.callingPrice
                                      ? web3.utils.fromWei(
                                          item?.callingPrice,
                                          "ether"
                                        )
                                      : 0}{" "}
                                    <span className="mute">BUSD</span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {paginate > 0 && (
                  <div className="pagination-custom">
                    <nav aria-label="Page navigation example">
                      <Stack spacing={2}>
                        <Pagination
                          size={"small"}
                          count={Math.ceil(paginate / 5)}
                          color="primary"
                          className="materal__pages"
                          showFirstButton
                          showLastButton
                          page={currentPage}
                          onChange={handleChangePage}
                        />
                      </Stack>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Mintredeem;
