import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Select, MenuItem } from '@material-ui/core';

const GraphQLInput = () => {

  const [queryType, setQueryType] = useState(1);

  const handleSelectChange = (e) => {
    console.log(e.target.value)
    setQueryType(e.target.value)
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
      <TextField fullWidth variant='outlined' color='secondary' label='Enter GraphQL Endpoint'></TextField>
    </Box>
  );
};

export default GraphQLInput;

