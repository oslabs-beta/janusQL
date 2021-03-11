import React, { useContext } from 'react';
import PerformanceContext from '../../context/PerformanceContext'
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';


const AvgLoadTime: React.FunctionComponent = () => {

  const { avgLoadTimes } = useContext(PerformanceContext)

  return (
    <Card>
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Avg Response Time / 50 Queries (m/s)
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {avgLoadTimes}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AvgLoadTime;