import React, { useEffect, useState } from "react";
import axios from "axios";
import Envirnoment from "../../utils/environment";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "hooks/useWeb3";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import { Nav } from "react-bootstrap";
import "./allusers.scss";
const Allusers = () => {
  const [userName, setUserName] = useState("Select");
  let filByTypeArray = ["userName", "walletAddress"];
  const { account } = useWeb3React();
  const accessToken = localStorage.getItem("accessToken");
  const [searchData, setSearchData] = useState({ users: [] });
  const [offset, setOffset] = useState(1);
  const [walletAddress, setWalletAddress] = useState();
  const web3 = useWeb3();
  function getSearchFunc() {
    if ([userName] == "walletAddress") {
      let res = web3.utils.isAddress(walletAddress);
      if (!res) {
        toast.error("Invalid wallet address");
        return;
      }
    }
    let params;
    if (walletAddress) {
      params = {
        offset: 1,
        [userName]: walletAddress,
        limit: 100,
      };
    } else {
      params = {
        offset,
        limit: 10,
      };
    }

    axios
      .get(Envirnoment.apiUrl + "users/get-users-list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
      })
      .then((response) => {
        console.log("searchData", response?.data?.data);
        // You can perform additional actions based on the API response
        setSearchData(response?.data?.data);
      })
      .catch((error) => {
        // Handle API errors here
        setSearchData();
        toast.error(error.request?.statusText);
      })
      .finally(() => {
        // setIsConfirmLoading(false);
      });
  }
  useEffect(() => {
    if (account && accessToken) {
      getSearchFunc();
    }
  }, [account, accessToken, offset]);

  console.log("searchData", searchData);

  return (
    <>
      <div className="content">
        <section className="mainuser">
          <div className="row">
            <div className="col-xl-12 col-12 p-0">
              <div className="mainhead">
                <h2>All Users</h2>
              </div>
              <div className="userparent">
                <div className="left">
                  <input
                    onChange={(e) => setWalletAddress(e.target.value)}
                    type="text"
                    placeholder="Search"
                  />
                  <img
                    src="\assests\search-normal.svg"
                    alt="img"
                    className="img-fluid search"
                  />
                  <div className="dropbtn">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {userName.charAt(0).toUpperCase() + userName.slice(1)}
                        <img
                          src="\assests\arrow-down.svg"
                          alt="img"
                          className="dropimg img-fluid"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {filByTypeArray?.map((item, id) => {
                          return (
                            <Dropdown.Item id={id}>
                              <a onClick={() => setUserName(item)}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                              </a>
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="right">
                  <button
                    onClick={getSearchFunc}
                    disabled={userName === "Select"}
                    className={userName !== "Select" ? "" : "disable"}
                  >
                    Search
                  </button>

                  {/* <button onClick={getSearchFunc} disabled={(!walletAddress || walletAddress === '') || userName === 'Select'} className={walletAddress && userName !== 'Select' ? '' : 'disable'}>Search</button> */}
                </div>
              </div>
              {searchData?.users?.length === 0 ? (
                <h2 className="text-center py-5">Data Not Found !</h2>
              ) : (
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
                  {searchData?.users?.map((item) => {
                    const dateString = item?.createdAt;
                    const date = new Date(dateString);

                    // Format the date in the desired format "09/02/2024 3:00 PM"
                    const formattedDate = `${(date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/${date
                      .getDate()
                      .toString()
                      .padStart(
                        2,
                        "0"
                      )}/${date.getFullYear()} ${date.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}`;

                    return (
                      <div className="parent one">
                        <div className="first">
                          <h4>{item?.userName || "N/A"}</h4>
                          <p>
                            {item?.walletAddress?.slice(0, 5)}...
                            {item?.walletAddress?.slice(-4)}
                          </p>
                        </div>
                        <div className="second">
                          <h4>{formattedDate}</h4>
                        </div>
                        <div className="third">
                          <h4>
                            {parseFloat(item?.totalStakedAmount || 0)?.toFixed(
                              4
                            )}{" "}
                            <span>
                              HYDT{" "}
                              <img
                                src="\assests\Group3.svg"
                                alt="img"
                                className="img-fluid pl-1"
                              />
                            </span>
                          </h4>
                        </div>
                        <div className="fourth">
                          <h4>
                            {item?.reward?.totalReward || 0}
                            <span>
                              HYDT{" "}
                              <img
                                src="\assests\Group3.svg"
                                alt="img"
                                className="img-fluid pl-1"
                              />
                            </span>
                          </h4>
                        </div>
                        <div className="five">
                          <h4>{item?.directRefferals}</h4>
                        </div>
                        <div className="six">
                          <h4>{item?.indirectRefferals}</h4>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pagi">
                    <div className="left"></div>
                    <div className="right">
                      <div className="arrows">
                        <img
                          onClick={() =>
                            offset > 1 ? setOffset(offset - 1) : null
                          }
                          src="\assests\pagi.svg"
                          alt="1mg"
                          className={
                            offset > 1 ? "img-fluid cp" : "img-fluid disable"
                          }
                        />
                      </div>
                      <Pagination>
                        <Pagination.Item active>{offset}</Pagination.Item>
                        <Pagination.Item>/</Pagination.Item>
                        <Pagination.Item>{searchData?.pages}</Pagination.Item>
                      </Pagination>
                      <div className="arrows">
                        <img
                          onClick={() =>
                            offset < searchData?.pages
                              ? setOffset(offset + 1)
                              : null
                          }
                          src="\assests\pagiright.svg"
                          alt="1mg"
                          className={
                            offset < searchData?.pages
                              ? "img-fluid cp"
                              : "img-fluid disable"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}{" "}
              {searchData?.users?.map((item) => {
                const dateString = item?.createdAt;
                const date = new Date(dateString);

                // Format the date in the desired format "09/02/2024 3:00 PM"
                const formattedDate = `${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${date
                  .getDate()
                  .toString()
                  .padStart(
                    2,
                    "0"
                  )}/${date.getFullYear()} ${date.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}`;

                return (
                  <div className="formobilecard d-none">
                    <div className="parents">
                      <div className="lefts">
                        <h3>User</h3>
                        <p>{item?.userName || "N/A"}</p>
                      </div>
                      <div className="rights">
                        <h3>Wallet Address</h3>
                        <p>
                          {item?.walletAddress?.slice(0, 5)}...
                          {item?.walletAddress?.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <div className="parents">
                      <div className="lefts">
                        <h3>Registration Date</h3>
                        <p>{formattedDate}</p>
                      </div>
                      <div className="rights">
                        <h3>Total HYDT Staked</h3>
                        <p>
                          {parseFloat(item?.totalStakedAmount || 0)?.toFixed(4)}
                          <span>
                            HYDT{" "}
                            <img
                              src="\assests\Group3.svg"
                              alt="img"
                              className="img-fluid"
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="parents">
                      <div className="lefts">
                        <h3>Commission Earned</h3>
                        <p>
                          {item?.reward?.totalReward}
                          <span>
                            HYDT{" "}
                            <img
                              src="\assests\Group3.svg"
                              alt="img"
                              className="img-fluid"
                            />
                          </span>
                        </p>
                      </div>
                      <div className="rights">
                        <h3>Level 1 Referral</h3>
                        <p>{item?.directRefferals}</p>
                      </div>
                    </div>
                    <div className="parents">
                      <div className="rights">
                        <h3>Indirect Referral</h3>
                        <p>{item?.indirectRefferals}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pagi formbl">
                <div className="left"></div>
                <div className="right">
                  <div className="arrows">
                    <img
                      onClick={() =>
                        offset > 1 ? setOffset(offset - 1) : null
                      }
                      src="\assests\pagi.svg"
                      alt="1mg"
                      className={
                        offset > 1 ? "img-fluid cp" : "img-fluid disable"
                      }
                    />
                  </div>
                  <Pagination>
                    <Pagination.Item active>{offset}</Pagination.Item>
                    <Pagination.Item>/</Pagination.Item>
                    <Pagination.Item>{searchData?.pages}</Pagination.Item>
                  </Pagination>
                  <div className="arrows">
                    <img
                      onClick={() =>
                        offset < searchData?.pages
                          ? setOffset(offset + 1)
                          : null
                      }
                      src="\assests\pagiright.svg"
                      alt="1mg"
                      className={
                        offset < searchData?.pages
                          ? "img-fluid cp"
                          : "img-fluid disable"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Allusers;
