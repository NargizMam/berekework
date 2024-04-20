import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Budget } from '../overview/budget';
import { TotalCustomers } from '../overview/total-customers';
import { TotalProfit } from '../overview/total-profit';
import {TasksProgress} from "../overview/tasks-progress";
import {Traffic} from "../overview/traffic";



export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget  />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers/>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress/>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic/>
      </Grid>
      <Grid lg={8} md={12} xs={12}>
      </Grid>
    </Grid>
  );
};
