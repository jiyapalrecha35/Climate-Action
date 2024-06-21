import React, { useState } from 'react';
import { Container, Typography, Grid, Slider, Select, MenuItem, FormControl, TextField, Button, styled } from '@mui/material';
import HomeAppliances from './HomeAppliances';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '500px',
}));
const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  width: '800px',
  margin: '0 auto',
  padding: '20px',
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#fafafa',
  borderRadius: '10px',
  fontFamily: 'Poppins, sans-serif',
  marginTop: '50px',
});

const StyledDiv = styled('div')(({ theme }) => ({
  borderRadius: '10px',
  width: '100%',
  padding: theme.spacing(3),
  margin: 'auto',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  backgroundColor: '#fafafa',
  fontFamily: 'Poppins, sans-serif',
}));

const StyledTypography = styled(Typography)({
  fontSize: '1rem',
  color: 'black',
  fontFamily: 'Poppins, sans-serif',
});

const StyledSliderDiv = styled('div')({
  fontFamily: 'Poppins, sans-serif',
  display: 'flex',
  alignItems: 'center',
});

const StyledSlider = styled(Slider)({
  fontFamily: 'Poppins, sans-serif',
  flexGrow: 1,
});

const StyledSliderValue = styled(Typography)({
  fontFamily: 'Poppins, sans-serif',
  marginLeft: '10px',
});

const ACPage = () => {
  const [acStatus, setAcStatus] = useState('off');
  const [temperatureSetting, setTemperatureSetting] = useState(20);
  const [numberOfHours, setNumberOfHours] = useState('');
  const [usageFrequency, setUsageFrequency] = useState('');
  const [dateOfSaving, setDateOfSaving] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [ratingPerUnit, setRatingPerUnit] = useState(0);
  const [numberOfUnits, setNumberOfUnits] = useState(1);
  const [co2Emissions, setCo2Emissions] = useState(null);

  const handleAcStatusChange = (event) => {
    setAcStatus(event.target.value);
  };

  const handleTemperatureSettingChange = (event, newValue) => {
    setTemperatureSetting(newValue);
  };

  const handleNumberOfHoursChange = (event) => {
    setNumberOfHours(event.target.value);
  };

  const handleUsageFrequencyChange = (event) => {
    setUsageFrequency(event.target.value);
  };

  const handleDateOfSavingChange = (event) => {
    setDateOfSaving(event.target.value);
  };

  const handleAdditionalNotesChange = (event) => {
    setAdditionalNotes(event.target.value);
  };

  const handleRatingPerUnitChange = (event) => {
    setRatingPerUnit(event.target.value);
  };

  const handleNumberOfUnitsChange = (event) => {
    setNumberOfUnits(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/calculate/ac', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acStatus,
          temperatureSetting,
          numberOfHours: Number(numberOfHours),
          usageFrequency,
          dateOfSaving,
          additionalNotes,
          ratingPerUnit: Number(ratingPerUnit),
          numberOfUnits: Number(numberOfUnits),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCo2Emissions(data.co2Emitted);
    } catch (error) {
      console.error('Error calculating CO2 emissions:', error);
    }
  };

  return (
    <>
      <HomeAppliances />
      <StyledContainer sx={{ marginTop: '150px' }}>
        <StyledDiv>
          <StyledTypography variant="h5" style={{ marginTop: '5px', fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px' }}>CoolSage: Air Conditioner Efficiency Guru</StyledTypography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTypography variant="h6">AC Status</StyledTypography>
              <StyledFormControl>
                <Select
                  labelId="ac-status-label"
                  id="ac-status"
                  value={acStatus}
                  onChange={handleAcStatusChange}
                >
                  <MenuItem value="off">Off</MenuItem>
                  <MenuItem value="on">On</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            {acStatus === 'on' && (
              <>
                <Grid item xs={12}>
                  <StyledTypography variant="h6">Temperature Setting</StyledTypography>
                  <StyledSliderDiv>
                    <StyledSlider
                      value={temperatureSetting}
                      onChange={handleTemperatureSettingChange}
                      min={16}
                      max={30}
                      step={1}
                    />
                    <StyledSliderValue>{temperatureSetting}°C</StyledSliderValue>
                  </StyledSliderDiv>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="h6">Number of Hours</StyledTypography>
                  <TextField
                    fullWidth
                    type="number"
                    value={numberOfHours}
                    onChange={handleNumberOfHoursChange}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
              </>
            )}
            {acStatus === 'off' && (
              <Grid item xs={12}>
                <StyledTypography variant="h6">Number of Hours</StyledTypography>
                <TextField
                  fullWidth
                  type="number"
                  value={numberOfHours}
                  onChange={handleNumberOfHoursChange}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <StyledTypography variant="h6">Usage Frequency</StyledTypography>
              <StyledFormControl fullWidth>
                <Select
                  labelId="usage-frequency-label"
                  id="usage-frequency"
                  value={usageFrequency}
                  onChange={handleUsageFrequencyChange}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12}>
              <StyledTypography variant="h6">Rating Per AC Unit</StyledTypography>
              <TextField
                fullWidth
                type="number"
                value={ratingPerUnit}
                onChange={handleRatingPerUnitChange}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTypography variant="h6">Number of AC Units</StyledTypography>
              <TextField
                fullWidth
                type="number"
                value={numberOfUnits}
                onChange={handleNumberOfUnitsChange}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Saving"
                type="date"
                value={dateOfSaving}
                onChange={handleDateOfSavingChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                multiline
                rows={4}
                value={additionalNotes}
                onChange={handleAdditionalNotesChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                style={{ width: '100%' }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant="h6">
                {co2Emissions > 0 ? `Estimated CO2 Emissions: ${co2Emissions} kg` : ''}
              </Typography>

            </Grid>
          </Grid>
        </StyledDiv>
      </StyledContainer>
    </>
  );
};

export default ACPage;
