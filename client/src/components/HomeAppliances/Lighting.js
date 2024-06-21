import React, { useState } from 'react';
import { Container, Grid, Slider, Select, MenuItem, FormControl, InputLabel, TextField, Switch, IconButton, styled, Typography, Button, Paper } from '@mui/material';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';
import HomeAppliances from './HomeAppliances';

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

const StyledTypography = styled(Typography)({
  fontSize: '1rem',
  color: 'black',
  fontFamily: 'Poppins, sans-serif',
});


const StyledSliderContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.2rem',
  fontFamily: 'Poppins, sans-serif',

});

const LightingPage = () => {
  const [energyConsumption, setEnergyConsumption] = useState(0);
  const [usageFrequency, setUsageFrequency] = useState('');
  const [numberOfHours, setNumberOfHours] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [lightingOn, setLightingOn] = useState(false);
  const [co2Emissions, setCo2Emissions] = useState(null);

  const CO2_EMISSION_FACTORS = {
    incandescent: 0.8, // kg CO2 per kWh for incandescent
    led: 0.3, // kg CO2 per kWh for LED
    fluorescent: 0.5 // kg CO2 per kWh for fluorescent
  };

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

  const handleLightingOnOffChange = (event) => {
    setLightingOn(event.target.checked);
  };

  const computeCo2Emissions = () => {
    let frequencyMultiplier;
    switch (usageFrequency) {
      case 'daily':
        frequencyMultiplier = 365; // assuming usage every day of the year
        break;
      case 'weekly':
        frequencyMultiplier = 52; // assuming usage every week of the year
        break;
      case 'monthly':
        frequencyMultiplier = 12; // assuming usage every month of the year
        break;
      default:
        frequencyMultiplier = 0;
    }
    
    const totalEnergyConsumption = energyConsumption * numberOfHours * frequencyMultiplier;
    const emissions = totalEnergyConsumption * (CO2_EMISSION_FACTORS[selectedDevice] || 0);
    setCo2Emissions(emissions);
  };

  return (
    <>
      <HomeAppliances />
      <StyledContainer sx={{marginTop:'150px'}}>
        <StyledDiv elevation={3}>
          <StyledTypography variant="h5" style={{marginTop:'5px',fontSize: '30px', fontWeight: 'bold', textAlign: 'center',marginBottom:'50px' }}>LumiSmart: Illumination Insights Hub</StyledTypography>
          <Grid container spacing={3}>
            <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="device-type">Type of Lighting</StyledInputLabel>
              <FormControl fullWidth>
                <Select
                  labelId="device-type-label"
                  id="device-type"
                  value={selectedDevice}
                  onChange={handleSelectedDeviceChange}
                  startAdornment={
                    <IconButton disabled>
                      <LightbulbIcon />
                    </IconButton>
                  }
                >
                  <MenuItem value="incandescent">Incandescent</MenuItem>
                  <MenuItem value="led">LED</MenuItem>
                  <MenuItem value="fluorescent">Fluorescent</MenuItem>
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
              <StyledInputLabel htmlFor="lighting-on-off">Lighting</StyledInputLabel>
              <Switch
                id="lighting-on-off"
                checked={lightingOn}
                onChange={handleLightingOnOffChange}
              />
            </StyledFormItem>
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
              <Button sx={{ width: "100%" }} variant="contained" color="success" onClick={computeCo2Emissions}>Save</Button>
            </StyledFormItem>
            {co2Emissions !== null && (
              <StyledFormItem item xs={12}>
                <Typography sx={{textAlign:'center',fontStyle:'bold'}} variant="h6">Estimated CO2 Emissions: {co2Emissions.toFixed(2)} kg CO2</Typography>
              </StyledFormItem>
            )}
          </Grid>
        </StyledDiv>
      </StyledContainer>
    </>
  );
};

export default LightingPage;
