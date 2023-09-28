import React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Chart } from "react-google-charts";
import DateRangePicker from 'rsuite/DateRangePicker';
const { combine, before, afterToday } = DateRangePicker;


const UrgentCare = () => {
  const now = new Date()
  const yesterday = new Date()
  yesterday.setDate(now.getDate() - 1);
  const [selectedDateRange, setSelectedDateRange] = React.useState([yesterday, now]);
  const [facilities, setFacilities] = React.useState([]);
  const [selectedFacility, setSelectedFacility] = React.useState('102b6f1d-8898-4910-99f0-c5d2d449f5d3');
  const [selectedFacilityData, setSelectedFacilityData] = React.useState({});

  const updateSelectedDateRange = async (value) => {
    await setSelectedDateRange(value);
    updateFacilityData(selectedFacility);
  }

  const updateFacilityData = async (facility_id) => {
    const dateArgs = "?start=" + selectedDateRange[0].toISOString() + "&end=" + selectedDateRange[1].toISOString()
    const data = await fetch('https://emergency-department-wait-times.api.smartplymouth.org/facilities/' + facility_id + dateArgs).then(function(response) {
      return response.json();
    });
    const waitChartData = data.data.map((row) => {
        return [
          row.dt,
          row.longest_wait
        ];
    });
    waitChartData[0] = ["Date/Time", "Longest Wait (mins)"];
    data.waitChartData = waitChartData;
    const patientChartData = data.data.map((row) => {
        return [
          row.dt,
          row.patients_in_department,
          row.patients_waiting
        ];
    });
    patientChartData[0] = ["Date/Time", "Patients in Department", "Patients Waiting"];
    data.patientChartData = patientChartData;
    setSelectedFacilityData(data);
  }

  const updateSelectedFacility = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedFacility(value);
    setSelectedFacilityData({});
    updateFacilityData(value);
  };

  React.useEffect(() => {
    const setUp = async () => {
        const facility_data = await fetch('https://emergency-department-wait-times.api.smartplymouth.org/facilities').then(function(response) {
            return response.json();
        });
        setFacilities(facility_data['facilities']);
        updateFacilityData('102b6f1d-8898-4910-99f0-c5d2d449f5d3');
    }
    setUp();
    return;
  }, []);

  const chartOptions = {
    legend: { position: "bottom" },
  };

  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h3" gutterBottom>
                Urgent Care Wait Times
            </Typography>
          </Grid>
          <Grid item xs={3} justifyContent="center" alignItems="center">
            <center>
                Select Facility:
                <br />
                <Select style={{maxWidth: 250}}
                    id="selectFacility"
                    value={selectedFacility}
                    label="Age"
                    onChange={updateSelectedFacility}
                  >
                    {facilities.map((facility) => {return <MenuItem key={facility.id} value={facility.id}>{facility.name}</MenuItem>})}
                </Select>
            </center>
          </Grid>
          <Grid item xs={3} justifyContent="center" alignItems="center">
            <center>
                Date Picker:
                <br />
                <DateRangePicker format='dd-MM-yyyy' showOneCalendar={ true } defaultValue={selectedDateRange} onChange={(value) => updateSelectedDateRange(value)} disabledDate={combine(before(new Date('2023-7-4')), afterToday())}/>
            </center>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>{ selectedFacilityData.name }</Typography>
          </Grid>
          <Grid item xs={6}>
            <strong>Type: </strong>{ selectedFacilityData.type }<br/>
            <strong>NHS Trust: </strong>{ selectedFacilityData.nhs_trust }
          </Grid>
          <Grid item xs={6}>
            <strong>Address: </strong>{ selectedFacilityData.address }<br/>
            <strong>Telephone: </strong>{ selectedFacilityData.telephone }
          </Grid>
          <Grid item xs={12}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={ selectedFacilityData.waitChartData }
              options={ chartOptions }
            />
          </Grid>
          <Grid item xs={12}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={ selectedFacilityData.patientChartData }
              options={ chartOptions }
            />
          </Grid>
        </Grid>
    </>
  )
}

export default UrgentCare;
