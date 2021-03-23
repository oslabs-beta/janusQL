import React from 'react';
import ResponseTime from '../Performance/ResponseTime'
import { Box, Paper, Grid } from '@material-ui/core/';
import Throughput from '../Performance/Throughput';
import Status from '../Performance/Status'

const ResPanel = (props: TabPanelProps) => {
  
  const { value, index } = props;

  return (
    <div hidden={ value !== index }>
      { value === index && (
        <Box className="res-box">
          <ResponseTime />
          <Box display='flex' width='100%' justifyContent='space-between' marginTop={2}>
          <Grid item>
            <Paper>
              <Status/>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Throughput />
            </Paper>
          </Grid>
        </Box>
      </Box>
       )}
    </div>
  );
};

export default ResPanel;