// import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useWeb3 from "./useWeb3";

import moment from "moment";

function GraphRedeem({ graphHistory }) {
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
//   let pricee = [];
  const lab = graphHistory && graphHistory?.map((item) => {
    let amount = web3.utils.fromWei((item?.amount), "ether");
    return parseFloat(amount);
  });
  
  const timestamp = graphHistory && graphHistory?.map((item) => {
    let date1 = new Date(item?.blockTimestamp * 1000);
    const endTime = moment(date1).format("hh:mm DD/MM");
    return  endTime;
  });

const labels = timestamp;
const amounts = lab;
// console.log("ccccccccc",amounts)
  console.log("21212121",graphHistory)
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
    </div>
  );
}
export default GraphRedeem;
