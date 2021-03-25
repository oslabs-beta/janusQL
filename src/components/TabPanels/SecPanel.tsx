import React from 'react';
import { Box, Paper, Grid } from '@material-ui/core/';
import Dos from '../Security/Dos';

const SecPanel = (props: TabPanelProps) => {
  
  const { value, index } = props;

  return (
    <div hidden={ value !== index }>
      { value === index && (
          <Box display='flex' width='100%' justifyContent='space-between' marginTop={2}>
          <Grid item>
            <Paper>
              <Dos />
            </Paper>
          </Grid>
        </Box>
       )}
    </div>
  );
};

export default SecPanel;