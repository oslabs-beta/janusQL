import React, { useState, ChangeEvent, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Select, MenuItem } from '@material-ui/core';
import PerformanceContext from '../context/PerformanceContext';

const GraphQLInput = () => {

  const [queryType, setQueryType] = useState(1);
  const { setUrl } = useContext(PerformanceContext);

  const handleSelectChange = (e:any) => {
    console.log(e.target.value)
    setQueryType(e.target.value)
  }

  const handleUrlChange = (e:ChangeEvent<HTMLInputElement>):void => {
    setUrl(e.target.value)
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        margin: 10,
      },
      dropdown: {
        paddingLeft: '15px',
        backgroundColor: '#FE688B',
        color: '#FFFF' 
      }
    })
  );

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Select className={classes.dropdown} value={queryType} onChange={handleSelectChange}>
        <MenuItem value={1}>Query</MenuItem>
        <MenuItem value={2}>Mutation</MenuItem>
      </Select>
      <TextField fullWidth variant='outlined' color='secondary' label='Enter GraphQL Endpoint' onChange={handleUrlChange}></TextField>
    </Box>
  );
};

export default GraphQLInput;

