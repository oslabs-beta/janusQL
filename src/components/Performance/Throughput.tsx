import React, { useContext } from 'react';
import PerformanceContext from '../../context/PerformanceContext'

const Throughput: React.FunctionComponent = () => {

  const { throughput } = useContext(PerformanceContext)

  return (
    <div>
      {throughput}
    </div>
  );
};

export default Throughput;