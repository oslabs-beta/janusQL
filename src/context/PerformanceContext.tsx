import React, { createContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

//TS interface for all fields of state
interface PerformanceContextState {
  responseTime: Array<number>,
  setResponseTime: Dispatch<SetStateAction<Array<number>>>
  throughput:number,
  setThroughput: Dispatch<SetStateAction<number>>
  loadTimes: Array<number>,
  setLoadTimes: Dispatch<SetStateAction<Array<number>>>
  avgLoadTimes: number,
  setAvgLoadTimes: Dispatch<SetStateAction<number>>
  queryResponse: string,
  setQueryResponse: Dispatch<SetStateAction<string>>,
  title: Array<string>,
  setTitle: Dispatch<SetStateAction<Array<string>>>,
  dos: string,
  setDos: Dispatch<SetStateAction<string>>,
}

// initialize a Performance Context
const PerformanceContext = createContext<any>(undefined);

// Setup state using useState
const PerformanceContextProvider: React.FunctionComponent = ({children}: any) => {

  // declare hooks as initial state
  const [responseTime, setResponseTime] = useState<Array<number>>([]);
  const [throughput, setThroughput] = useState<number>(0);
  const [loadTimes, setLoadTimes] = useState<Array<number>>([]);
  const [avgLoadTimes, setAvgLoadTimes] = useState<number>(0);
  const [queryResponse, setQueryResponse] = useState<string>('');
  const [title, setTitle] = useState<Array<string>>([]);
  const [dos, setDos] = useState<string>('');

  // state declaration
  const PerformanceState: PerformanceContextState = {
    responseTime,
    setResponseTime,
    throughput,
    setThroughput,
    loadTimes,
    setLoadTimes,
    avgLoadTimes,
    setAvgLoadTimes,
    queryResponse,
    setQueryResponse,
    title,
    setTitle,
    dos,
    setDos
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