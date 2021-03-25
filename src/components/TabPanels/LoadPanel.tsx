import React from 'react';
import { Box, Paper, Grid } from '@material-ui/core/';
import AvgLoadTime from '../Performance/AvgLoadTime';
import Load from '../Performance/Load';

const LoadPanel = (props: TabPanelProps) => {
  
  const { value, index } = props;

  return (
    <div hidden={ value !== index }>
      { value === index && (
        <Box>
          <Load />
          <Box display='flex' width='100%' justifyContent='space-between' marginTop={2}>
          <Grid item>
            <Paper>
              <AvgLoadTime />
            </Paper>
          </Grid>
        </Box>
      </Box>
       )}
    </div>
  );
};

export default LoadPanel;