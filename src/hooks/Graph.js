// import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useWeb3 from "./useWeb3";

import moment from "moment";

function Graph({ statsAD }) {
  const web3 = useWeb3();
  var Decimal = require('decimal.js');
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    legend: {
      display: false,
  }
    // responsive: true,
    // plugins: {
    //   legend: false,
    //   title: {
    //     // display: true,
    //     text: "AUM",
    //   },
    // },
  };

//   const labels = chartData.map((item) => {
//     return (parseInt(item?.hour?.split("T")[1].substr(0,2)) + 5);
//   });
let pricee = [];

  const lab = statsAD && statsAD?.map((item) => {
    let amount = web3.utils.fromWei((item?.amount), "ether");
    return parseFloat(amount);
  });
  
  const timestamp = statsAD && statsAD?.map((item) => {
    let date1 = new Date(item?.blockTimestamp * 1000);
    const endTime = moment(date1).format("hh:mm DD/MM");
    return  endTime;
  });
//   for (let i = 0; i < lab?.length; i++) {
//     // console.log("rrrrrrrrr",typeof(lab[i]))
//     pricee.push(parseFloat(lab[i])/1000000000000000000);
//   }
// console.log("lablab",pricee);

const labels = timestamp;
const amounts = lab;
console.log("ccccccccc",amounts)
  console.log("labels",labels)
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: amounts,
        fill: false,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div id="chart" className="" style={{ height: "90%", width: "100%" }}>
      <Line options={options} data={data} />
      {/* <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      /> */}
    </div>
  );
}
export default Graph;

// import React from "react";
// import { Line } from "react-chartjs-2";

// import { Col, Row, Typography } from "antd";
// const { Title } = Typography;

// const coinHistory = {
//   status: "success",
//   data: {
//     change: 147.09,
//     history: [
//       { price: "0.00000985", timestamp: 1634756400000 },
//       { price: "0.0000282727", timestamp: 1634760000000 },
//       { price: "0.0000282314", timestamp: 1634760000000 },
//       { price: "900.0184525", timestamp: 1634760000000 }
//     ]
//   }
// };

// const currentPrice = "0.321432";
// const coinName = "Coin bit name";

// function Graph({ statsAD }) {
//   const coinPrice = [];
//   const coinTimestamp = [];
//   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//     coinPrice.push(coinHistory?.data?.history[i].price);
//     coinTimestamp.push(
//       new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
//     );
//   }

//   const data = {
//     labels: coinTimestamp,
//     datasets: [
//       {
//         label: "Price In USD",
//         data: coinPrice,
//         fill: false,
//         backgroundColor: "#0071bd",
//         borderColor: "#0071bd"
//       }
//     ]
//   };
//   const options = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
            
//           }
//         }
//       ]
//     }
//   };

//   return (
//     <>
//       <Row className="chart-header">
//         <Title level={2} className="chart-title">
//           {coinName} Price Chart
//         </Title>
//         <Col className="price-container">
//           <Title level={5} className="price-change">
//             Change: {coinHistory?.data?.change}%
//           </Title>
//           <Title level={5} className="current-price">
//             Current {coinName} Price: $ {currentPrice}
//           </Title>
//         </Col>
//       </Row>
//       <Line data={data} options={options} />
//     </>
//   );
// }
// export default Graph;