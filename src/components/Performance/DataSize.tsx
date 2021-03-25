import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import PerformanceContext from '../../context/PerformanceContext'

const DataSize: React.FunctionComponent = () => {

  const { bytes, title } = useContext(PerformanceContext);

  const chart = {
    labels: title,
    datasets: [
      {
        label: 'Data size (bytes)',
        data: bytes,
        backgroundColor: '#ffe69e',
        borderWidth:4,
      }
    ]
  }

  const options = {
    title: {
      display: true,
      text: 'Bytes',
      responsive: false,
      fontSize: 25,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }
        ]
      }
    }
  }

  return (
    <div className='rt-chart'>
      <Bar data={chart} options={options}></Bar>
    </div>
  );
};

export default DataSize;
