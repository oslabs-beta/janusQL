import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const GraphContainer = () => {
  return (
    <div className='graph-container'>
      <Container>
        <h1 className="graph-title">Metrics</h1>
        <Box display='flex' width='100%' justifyContent='space-between'>
          <TextField fullWidth variant='outlined' color='secondary' label='Enter GraphQL Endpoint'></TextField>
          <Button className='submit-btn' variant='contained' color='secondary'>Submit</Button>
        </Box>
      </Container>
    </div>
  );
};

export default GraphContainer;
