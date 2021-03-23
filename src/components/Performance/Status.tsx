import React, { useContext } from 'react';
import PerformanceContext from '../../context/PerformanceContext'
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';


const Status: React.FunctionComponent = () => {

  const { status } = useContext(PerformanceContext)

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
              Status
            </Typography>
            <Typography className={status === 200 ? "green" : "red"}
              variant="h3"
            >
              {status}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Status;