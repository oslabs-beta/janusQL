import React, { createContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

//TS interface for all fields of state
interface PerformanceContextState {
  responseTime: Array<number>,
  setResponseTime: Dispatch<SetStateAction<Array<number>>>
  throughput:number,
  setThroughput: Dispatch<SetStateAction<number>>
}

// initialize a Performance Context
const PerformanceContext = createContext<any>(undefined);

// Setup state using useState
const PerformanceContextProvider: React.FunctionComponent = ({children}: any) => {

  // declare hooks as initial state
  const [responseTime, setResponseTime] = useState<Array<number>>([]);
  const [throughput, setThroughput] = useState<number>(0);

  // state declaration
  const PerformanceState: PerformanceContextState = {
    responseTime,
    setResponseTime,
    throughput,
    setThroughput
  };

  return (
    <PerformanceContext.Provider value={PerformanceState}>
      {children}
    </PerformanceContext.Provider>
  )

}

export {
  PerformanceContextProvider,
}

export default PerformanceContext;