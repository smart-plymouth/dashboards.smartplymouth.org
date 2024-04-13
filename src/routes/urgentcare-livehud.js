import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const UrgentCareHUD = () => {
  const [countdown, setCountdown] = React.useState(60);
  const [facilities, setFacilities] = React.useState([]);

  const fetchData = async () => {
    console.log("Fetching data...");
    const data = await fetch('https://ed-wait-times-api.smartplymouth.org/facilities').then(function(response) {
      return response.json();
    });
    const fetchedFacilities = await Promise.all(data.facilities.map(async (facility) => {
      const data = await fetch('https://ed-wait-times-api.smartplymouth.org/facilities/' + facility.id).then(function(response) {
        return response.json();
      });
      data.latest = data.data.pop();
      return data;
    }));
    setFacilities(fetchedFacilities);
  };

  React.useEffect(() => {
    fetchData();
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          fetchData();
          return 60;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);


  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={10}>
              <Typography variant="h3" gutterBottom>
                Urgent Care Wait Times
              </Typography>
          </Grid>
          <Grid item xs={2}>
              Next Refresh: { countdown }
          </Grid>
          {facilities.map((facility) => {
            return (
              <>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    { facility.name }
                  </Typography>
                  <br/>
                  <strong>Last Updated:</strong> { facility.latest.dt }
                </Grid>
                <Grid item xs={3}>
                    <Card raised={false}>
                      <CardContent>
                        <center>
                            <Typography variant="h5">
                              { facility.latest.longest_wait } mins
                            </Typography>
                            <Typography variant="h6">
                              Longest Wait
                            </Typography>
                        </center>
                      </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <Card raised={false}>
                      <CardContent>
                        <center>
                            <Typography variant="h5">
                              { facility.latest.patients_in_department }
                            </Typography>
                            <Typography variant="h6">
                              Patients in Department
                            </Typography>
                        </center>
                      </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <Card raised={false}>
                      <CardContent>
                        <center>
                            <Typography variant="h5">
                              { facility.latest.patients_waiting }
                            </Typography>
                            <Typography variant="h6">
                              Patients Waiting
                            </Typography>
                        </center>
                      </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                  <br/>
                </Grid>
              </>
              )
            })
          }
        </Grid>
    </>
  )
}

export default UrgentCareHUD;
