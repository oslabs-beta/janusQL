import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ResponseTime from '../components/Performance/ResponseTime';
import Throughput from '../components/Performance/Throughput';
import Load from '../components/Performance/Load';
import AvgLoadTime from '../components/Performance/AvgLoadTime';
import Dos from '../components/Security/Dos';


const GraphContainer:React.FunctionComponent = () => {

  return (
      <Container>
        <h1 className="graph-title">Metrics</h1>
        <Grid className='grid' container spacing={1} justify='center'>
          <Box display='flex' width='80%' justifyContent='space-between' marginTop={5}>
            <Grid item>
              <Paper>
                <ResponseTime className='graph'/>
              </Paper>
            </Grid>
          </Box>
          <Box display='flex' width='80%' justifyContent='space-between' marginTop={5}>
            <Grid item>
              <Paper>
                <Load className='graph'/>
              </Paper>
            </Grid>
          </Box>
          <Box display='flex' width='80%' justifyContent='space-between' marginTop={5}>
            <Grid item>
              <Paper>
              <AvgLoadTime></AvgLoadTime>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
              <Throughput></Throughput>
              </Paper>
            </Grid>
          </Box>
          <Box display='flex' width='80%' justifyContent='space-between' marginTop={5}>
          <Grid item>
              <Paper>
              <Dos></Dos>
              </Paper>
            </Grid>
            </Box>
        </Grid>

      </Container>
  );
};

export default GraphContainer;
