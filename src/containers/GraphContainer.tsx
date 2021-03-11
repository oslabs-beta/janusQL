import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ResponseTime from '../components/Performance/ResponseTime';
import SmallGraph from '../components/Performance/Status';
import Throughput from '../components/Performance/Throughput';
import Load from '../components/Performance/Load';

const GraphContainer:React.FunctionComponent = () => {

  return (
    <div className='graph-container'>
      <Container>
        <h1 className="graph-title">Metrics</h1>
        <Grid className='grid' container spacing={1} justify='center'>
          <Box display='flex' width='100%' justifyContent='space-between' marginTop={5}>
            <Grid item>
              <Paper style={{height:400, width:500}}>
                <ResponseTime className='graph'/>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{height:400, width:500}}>
                <Load></Load>
              </Paper>
            </Grid>
          </Box>
          <Box display='flex' width='100%' justifyContent='space-between' marginTop={5}>
            <Grid item>
              <Paper style={{height:200, width:500}}>
              <Throughput></Throughput>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{height:200, width:500}}>
              </Paper>
            </Grid>
          </Box>
          <Box display='flex' width='100%' justifyContent='space-between' marginTop={5}>
            <Grid item>
              <Paper style={{height:200, width:500}}><SmallGraph className='small-graph'/></Paper>
            </Grid>
            <Grid item>
              <Paper style={{height:200, width:500}}><SmallGraph className='small-graph'/></Paper>
            </Grid>
          </Box>
        </Grid>

      </Container>
    </div>
  );
};

export default GraphContainer;