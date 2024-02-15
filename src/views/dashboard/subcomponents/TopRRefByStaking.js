import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Envirnoment from '../../../utils/environment'
import { useWeb3React } from "@web3-react/core";

import Pagination from 'react-bootstrap/Pagination';
export default function TopRRefByStaking() {
    const { account } = useWeb3React();
    const accessToken = localStorage.getItem('accessToken');
    const [data, setData] = useState()
    const [offset, setOffset] = useState(1)
    function getTopRefByEarnComFunc() {
        const params = {
            offset,
            limit: 5,
        };

        axios
            .get(Envirnoment.apiUrl + 'users/get-admin-top-refferals-by-staking-amount', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: params,
            })
            .then((response) => {
                console.log('data', response?.data?.data);
                // You can perform additional actions based on the API response
                setData(response?.data?.data);
            })
            .catch((error) => {
                // Handle API errors here
                // toast.error(error.request?.statusText)
            })
            .finally(() => {
                // setIsConfirmLoading(false);
            });
    }


    useEffect(() => {
        if (account) {
            getTopRefByEarnComFunc()
        }
    }, [account, offset])
    console.log('data', data);
  return (
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
              {data?.users?.map((item, id) => {
                  return (
              <div className="parenthead">
                  <div className="inner">

                      <h4>{item?.id}</h4>

                      <div className="second">
                                  <h4>{item?.userName || 'N/A'}</h4>
                                  <p>{item?.walletAddress?.slice(0, 5)}...{item?.walletAddress?.slice(-4)}</p>
                      </div>

                              <h4>{parseFloat(item?.totalStakedAmount || 0)?.toFixed(4) || 0}</h4>
                  </div>

              </div>
                  )
              })}
          </div>
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
                      <Pagination.Item >{data?.pages}</Pagination.Item>

                  </Pagination>
                  <div className='arrows'>
                      <img onClick={() => offset < data?.pages ? setOffset(offset + 1) : null} src='\assests\pagiright.svg' alt='1mg' className={offset < data?.pages ? 'img-fluid cp' : 'img-fluid disable'} />

                  </div>
              </div>
          </div>
      </div>
  )
}
