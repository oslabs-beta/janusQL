import React, { useContext, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Box, Button, Paper, Typography, Select, MenuItem } from '@material-ui/core/';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
import "codemirror/addon/lint/lint.css";
import PerformanceContext from '../context/PerformanceContext';

const QueryEditor = () => {

  const [query, setQuery] = useState('');
  const [test, setTest] = useState(0);

  const {
    url,
    setDos, 
    setTitle, 
    queryResponse, 
    setQueryResponse, 
    setBytes, 
    setAvgLoadTimes, 
    setLoadTimes, 
    setThroughput, 
    setResponseTime,
    setStatus 
  } = useContext(PerformanceContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      typ: {
        textAlign: "center",
        background: "#FE688B",
        color: "#FFFF",
        padding: "0.5em"
      },
      dropdown: {
        paddingLeft: '15px',
        backgroundColor: '#FE688B',
        color: '#FFFF' 
      }
    }),
  );

  const classes = useStyles();

  const gQLoptions = {
    mode: "graphql",
    scrollbarStyle: "native",
    theme: "monokai",
    lineNumbers: true,
    lint: true,
    hintOptions: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    autocursor: false,
    indentUnit: 2,
    tabSize: 2,
  }

  const handleReset = () => {
    setResponseTime([]);
    setThroughput(0);
    setLoadTimes([]);
    setAvgLoadTimes(0);
    setTitle([]);
    setDos('');
    setQueryResponse('');
    setStatus(0);
    setBytes([]);
  }

  const handleSelectChange = (e:any) => {
    setTest(e.target.value)
  }

  const handleQuerySubmit = () => {

    if (test === 0) {
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
        setBytes((bytes:any ) => [
          ...bytes,
          data.bytes
        ])
        setStatus(data.status)
        setThroughput(data.throughputCounter)
        setQueryResponse(data.responseTimeData, null, 2);
        console.log(queryResponse)
        setTitle((title:any) => [
          ...title,
          'query'
        ])
      })
      .catch((err) => console.log('Failed Send URL/Query to server ERROR: ', err));
    } else if (test === 1) {
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
    } else if (test === 2) {
      fetch('http://localhost:3000/input/brutedos', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/JSON',
          },
          body: JSON.stringify({url: url}),
        })
          .then((res) => res.json())
          .then((data) => {
              setQueryResponse(data.queryString);
              setDos(data.clientStatus);
          })
          .catch((err) => console.log('Failed Send URL/Query to server ERROR: ', err));
    }
  }

  const handleQueryChange = (editor:any, data:any, value:any) => {
    setQuery(value)
  }

  return (
    <Box>
      <Paper>
        <Typography className={classes.typ}>Workspace</Typography>
      </Paper>
      <CodeMirror onChange={handleQueryChange} onBeforeChange={handleQueryChange} className='code-mirror' options={gQLoptions} value={query} />
      <Box display='flex' justifyContent='space-between' mt='1em'>
        <Button variant='contained' color='primary' onClick={handleReset}>Reset</Button>
        <Select className={classes.dropdown} value={test} onChange={handleSelectChange}>
          <MenuItem value={0}>Response / Size</MenuItem>
          <MenuItem value={1}>Load</MenuItem>
          <MenuItem value={2}>Security</MenuItem>
        </Select>
        <Button variant='contained' color='primary' onClick={handleQuerySubmit}>Submit</Button>
      </Box>
    </Box>
  );
};

export default QueryEditor;