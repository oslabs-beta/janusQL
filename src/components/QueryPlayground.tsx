import React, { ChangeEvent, useContext, useState } from 'react';
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
  const { responseTime, setResponseTime } = useContext(PerformanceContext);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');

  console.log(responseTime)

  // fetch input data
  const handleSubmit = () => {
    // fetch('http://localhost:3000/input')
    //   .then((res) => res.json())
    //   .then((data) => {

    //   // TODO : TS
    //   setResponseTime((responseTime: any) => [
    //     ...responseTime,
    //     data
    //   ]);
    //   })
    // .catch(err => console.log('Handle Submit: Get ResponseTime: ERROR: ', err))
    fetch('http://localhost:3000/input/responsetime', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({query: query, url: url}),
    })
      .then((res) => res.json())
      .then((data) => {setResponseTime((responseTime: any) => [
            ...responseTime,
            data.responseTime
          ]);
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
    setResponseTime([])
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
      <Box display="flex" justifyContent="space-evenly" mt="1em">
        <Button variant="contained" color='primary' onClick={handleSubmit}>Submit</Button>
        <Button variant="contained" color='primary'>Security Test</Button>
        <Button variant="contained" color='primary' onClick={handleReset}>Reset</Button>
      </Box>
      </Container>
    </div>
  );
};

export default QueryPlayground;