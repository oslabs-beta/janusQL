;import React, { ChangeEvent, useContext, useState } from 'react';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from'@material-ui/core/TextField';
import PerformanceContext from '../context/PerformanceContext';


const QueryPlayground: React.FunctionComponent = () => {

  // Pull out responseTime & setResponseTime state from Performance Context
  const { dos, setDos, title, setTitle, queryResponse, setQueryResponse, avgLoadTimes, setAvgLoadTimes, setLoadTimes, setThroughput, responseTime, setResponseTime } = useContext(PerformanceContext);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');

  console.log(responseTime)
  console.log(avgLoadTimes)
  console.log(queryResponse)
  console.log(title);

  // fetch query input data
  const handleSubmit = () => {
    fetch('http://localhost:3000/input/responsetime', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({query: query, url: url}),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseTime((responseTime: any) => [
          ...responseTime,
          data.responseTime
        ])
        setQueryResponse(data.responseTimeData, null, 2);
        setTitle((title:any) => [
          ...title,
          'query'
        ])
      })
      .catch((err) => console.log('Failed Send URL/Query to server ERROR: ', err));
  }

  // fetch throughput input data
  const handleThroughput = () => {
    fetch('http://localhost:3000/input/throughput', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({query: query, url: url}),
    })
      .then((res) => res.json())
      .then((data) => {
        setThroughput(data)
      })
      .catch((err) => console.log('Failed Send URL/Query to server ERROR: ', err));
  }

  // fetch load input data
  const handleLoad = () => {
    fetch('http://localhost:3000/input/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({query: query, url: url}),
    })
      .then((res) => res.json())
      .then((data) => {
          setLoadTimes(data.storage)
          setAvgLoadTimes(data.avg)
      })
      .catch((err) => console.log('Failed Send URL/Query to server ERROR: ', err));
  }

    // fetch load input data
    const handleDos = () => {
      fetch('http://localhost:3000/input/dos', {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
        }
      })
        .then((res) => res.json())
        .then((data) => {
            setDos('Pass');
            setQueryResponse(data);
        })
        .catch((err) => console.log('Failed Send URL/Query to server ERROR: ', err));
    }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(`${e.target.value}`)
  }

  const handleQueryChange = (editor:any, data:any, value:any) => {
    setQuery(value)
    console.log(query)
  }

  const handleReset = () => {
    setResponseTime([]);
    setThroughput(0);
    setLoadTimes([]);
    setAvgLoadTimes(0);
    setTitle([]);
    setDos('');
    setQueryResponse('');
  }
  
  return (
    <div className="playground">
      <Container maxWidth='sm'>
        <h1 className="playground-title">Query</h1>
        <Box display='flex' width='100%' justifyContent='space-between'>
          <TextField fullWidth variant='outlined' onChange={handleUrlChange} color='secondary' label='Enter GraphQL Endpoint' value={url}></TextField>
        </Box>
        <CodeMirror
          onBeforeChange = {handleQueryChange}
          value={query}
          className="code-mirror"
          options={{
            autoCloseBrackets: true,
            tabSize: 2,
            lineWrapping: true,
            lint: true,
            mode: 'javascript',
            lineNumbers: true
          }}
        />
        <CodeMirror
          value={queryResponse}
          className="code-mirror"
          options={{
            autoCloseBrackets: true,
            tabSize: 2,
            lineWrapping: true,
            lint: true,
            mode: 'javascript',
            lineNumbers: true,
            readOnly: true
          }}
        />
        <Box display="flex" justifyContent="space-evenly" mt="1em">
          <Button variant="contained" color='primary' onClick={handleSubmit}>Query</Button>
          <Button variant="contained" color='primary' onClick={handleLoad}>Load Test</Button>
          <Button variant="contained" color='primary' onClick={handleThroughput}>Throughput Test</Button>
        </Box>
        <Box display="flex" justifyContent="space-evenly" mt="1em">
          <Button variant="contained" color='primary' onClick={handleDos}>Dos Test</Button>
          <Button variant="contained" color='primary' onClick={handleReset}>Reset</Button>
        </Box>
      </Container>
    </div>
  );
};

export default QueryPlayground;