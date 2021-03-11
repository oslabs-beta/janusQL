import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import PerformanceContext from '../../context/PerformanceContext'

const LoadTimes: React.FunctionComponent = () => {

  const { loadTimes } = useContext(PerformanceContext)
  
  const chart = {
      labels: ['query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query'],
      datasets: [
        {
          label: 'Response Time (ms)',
          data: loadTimes,
          backgroundColor: [
            'rgba(75,192,192,0.6)'
          ],
          borderWidth:4
        }
      ]
    }

  return (
    <div>
      <Bar data={chart}></Bar>
    </div>
  );
};

export default LoadTimes;