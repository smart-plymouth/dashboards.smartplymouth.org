import React from 'react';
import { Link } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import SpeedIcon from '@mui/icons-material/Speed';
import HistoryIcon from '@mui/icons-material/History';


const UrgentCareMenu = () => {

  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <center>
              <Typography variant="h3" gutterBottom>
                Urgent Care Wait Times
              </Typography>
            </center>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}><Link to='/urgent-care/live-hud'><Button fullWidth={true} variant="contained" startIcon={<SpeedIcon />} size="large">Live Heads Up Display</Button></Link></Grid>
          <Grid item xs={4}><Link to='/urgent-care/history'><Button fullWidth={true} variant="contained" startIcon={<HistoryIcon />} size="large">History</Button></Link></Grid>
          <Grid item xs={2}></Grid>
        </Grid>
    </>
  )
}

export default UrgentCareMenu;
