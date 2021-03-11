import React, { useContext } from 'react';
import PerformanceContext from '../../context/PerformanceContext'

const AvgLoadTime: React.FunctionComponent = () => {

  const { avgLoadTimes } = useContext(PerformanceContext)

  return (
    <div>
      {avgLoadTimes}
    </div>
  );
};

export default AvgLoadTime;