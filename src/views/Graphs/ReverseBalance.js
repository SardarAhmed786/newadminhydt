import React from 'react'
import ReactApexChart from "react-apexcharts";
import "./graph.scss"

const ReverseBalance = () => {
    const state = {
          
        series: [{
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['#1777E2']
          },
          grid: {
            borderColor: "#1A1B1C",
            row: {
              colors: ['transparent', 'transparent'], 
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          },
          tooltip: {
            enabled: true,
      fillSeriesColor: true,
      theme: true,
            style: {
                fontSize: '12px',
                colors: "red",
              },
          }
        },
      
      
      };
    
  return (
    <div id="chart">
  <ReactApexChart options={state.options} series={state.series} type="line" height={250} />
</div>
  )
}


export default ReverseBalance
