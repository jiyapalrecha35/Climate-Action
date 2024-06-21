import React, { useState } from 'react';
import { Container, Grid, Slider, Select, MenuItem, FormControl, InputLabel, TextField, Switch, IconButton, styled, Typography, Button } from '@mui/material';
import { Waves as WaterHeaterIcon } from '@mui/icons-material';
import HomeAppliances from './HomeAppliances';
import axios from 'axios';

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

const StyledFormItem = styled(Grid)({
  fontFamily: 'Poppins, sans-serif',
  marginBottom: '20px',
});

const StyledInputLabel = styled(InputLabel)({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.2rem',
  color: 'black',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: '1.2rem',
    fontFamily: 'Poppins, sans-serif',
    color: 'black',
  },
});

const StyledSliderContainer = styled('div')({
  fontFamily: 'Poppins, sans-serif',
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.2rem',
});

const StyledTypography = styled(Typography)({
  fontSize: '1rem',
  color: 'black',
  fontFamily: 'Poppins, sans-serif',
});

const WaterHeaterPage = () => {
  const [energyConsumption, setEnergyConsumption] = useState(0);
  const [usageFrequency, setUsageFrequency] = useState('');
  const [numberOfHours, setNumberOfHours] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [heaterOn, setHeaterOn] = useState(false);
  const [temperature, setTemperature] = useState(40); // Default temperature
  const [co2Emitted, setCo2Emitted] = useState(null);

  const handleEnergyConsumptionChange = (event, newValue) => {
    setEnergyConsumption(newValue);
    setSliderValue(newValue);
  };

  const handleUsageFrequencyChange = (event) => {
    setUsageFrequency(event.target.value);
  };

  const handleNumberOfHoursChange = (event) => {
    setNumberOfHours(event.target.value);
  };

  const handleSelectedDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleHeaterOnOffChange = (event) => {
    setHeaterOn(event.target.checked);
  };

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  const handleCalculateCO2 = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/calculate/water-heater', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          energyConsumption,
          usageFrequency,
          numberOfHours: Number(numberOfHours),
          selectedDevice
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setCo2Emitted(data.co2Emitted);
    } catch (error) {
      console.error('Error calculating CO2 emissions:', error);
    }
  };
  

  return (
    <>
      <HomeAppliances />
      <StyledContainer sx={{marginTop:'150px'}}>
        <StyledDiv elevation={3}>
          <StyledTypography variant="h5" style={{marginTop:'5px',fontSize: '30px', fontWeight: 'bold', textAlign: 'center',marginBottom:'50px' }}>AquaFlow: Water Heater Usage Wizard</StyledTypography>
          <Grid container spacing={3}>
            <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="device-type">Type of Water Heater</StyledInputLabel>
              <FormControl fullWidth>
                <Select
                  labelId="device-type-label"
                  id="device-type"
                  value={selectedDevice}
                  onChange={handleSelectedDeviceChange}
                  startAdornment={
                    <IconButton disabled>
                      <WaterHeaterIcon />
                    </IconButton>
                  }
                >
                  <MenuItem value="solar">Solar Heater</MenuItem>
                  <MenuItem value="gas-geaser">Gas Geaser</MenuItem>
                  <MenuItem value="electric-coil">Electric Coil</MenuItem>
                  <MenuItem value="kettle">Kettle</MenuItem>
                </Select>
              </FormControl>
            </StyledFormItem>
            <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="energy-consumption">Energy Consumption (kWh)</StyledInputLabel>
              <StyledSliderContainer>
                <Slider
                  value={energyConsumption}
                  onChange={handleEnergyConsumptionChange}
                  min={0}
                  max={100}
                  step={1}
                  valueLabelDisplay="auto"
                />
                <Typography variant="body1">{sliderValue}</Typography>
              </StyledSliderContainer>
            </StyledFormItem>
            <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="usage-frequency">Usage Frequency</StyledInputLabel>
              <FormControl fullWidth>
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
              </FormControl>
            </StyledFormItem>
            <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="number-of-hours">Number of Hours</StyledInputLabel>
              <StyledTextField
                fullWidth
                type="number"
                id="number-of-hours"
                value={numberOfHours}
                onChange={handleNumberOfHoursChange}
                inputProps={{ min: 1 }}
              />
            </StyledFormItem>
            <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="heater-on-off">Heater</StyledInputLabel>
              <Switch
                id="heater-on-off"
                checked={heaterOn}
                onChange={handleHeaterOnOffChange}
              />
            </StyledFormItem>
            {heaterOn && (
              <StyledFormItem item xs={12}>
                <StyledInputLabel htmlFor="temperature">Temperature</StyledInputLabel>
                <Slider
                  value={temperature}
                  onChange={handleTemperatureChange}
                  min={10}
                  max={100}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </StyledFormItem>
            )}
            {/* <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="date-of-saving">Date of Saving</StyledInputLabel>
              <TextField
                fullWidth
                id="date-of-saving"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledFormItem> */}
            <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="additional-notes">Additional Notes</StyledInputLabel>
              <TextField
                fullWidth
                id="additional-notes"
                multiline
                rows={4}
                variant="outlined"
              />
            </StyledFormItem>
            <StyledFormItem item xs={12}>
              <Button sx={{width:"100%"}} variant="contained" color="success" onClick={handleCalculateCO2}>Save</Button>
            </StyledFormItem>
            {co2Emitted !== null && (
              <StyledFormItem item xs={12}>
                <StyledTypography variant="h6" style={{textAlign: 'center', marginTop: '20px'}}>
                  Estimated CO2 Emissions: {co2Emitted.toFixed(2)} kg
                </StyledTypography>
              </StyledFormItem>
            )}
          </Grid>
        </StyledDiv>
      </StyledContainer>
    </>
  );
};

export default WaterHeaterPage;
