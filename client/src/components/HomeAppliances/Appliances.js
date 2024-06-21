import React, { useState } from 'react';
import { Container, Grid, Slider, Select, MenuItem, FormControl, InputLabel, TextField, IconButton, styled, Typography, Button } from '@mui/material';
import { Tv as TvIcon, Kitchen as FridgeIcon, LocalLaundryService as WashingMachineIcon } from '@mui/icons-material';
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
  fontFamily: 'Poppins, sans-serif',
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
  fontFamily: 'Poppins, sans-serif',
  display: 'flex',
  alignItems: 'center',
  color: 'black',
  fontSize: '1.2rem',
});

const AppliancesPage = () => {
  const [energyConsumption, setEnergyConsumption] = useState(0);
  const [usageFrequency, setUsageFrequency] = useState('');
  const [numberOfHours, setNumberOfHours] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [co2Emissions, setCo2Emissions] = useState(0);

  const CO2_EMISSION_FACTORS = {
    tv: 0.4, // kg CO2 per kWh for TV
    fridge: 0.67, // kg CO2 per kWh for Fridge
    'washing-machine': 0.8 // kg CO2 per kWh for Washing Machine
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

  const calculateCO2Emissions = () => {
    let annualConsumption = 0;

    switch (usageFrequency) {
      case 'daily':
        annualConsumption = energyConsumption * numberOfHours * 365;
        break;
      case 'weekly':
        annualConsumption = energyConsumption * numberOfHours * 52;
        break;
      case 'monthly':
        annualConsumption = energyConsumption * numberOfHours * 12;
        break;
      default:
        annualConsumption = 0;
    }

    const co2 = annualConsumption * (CO2_EMISSION_FACTORS[selectedDevice] || 0);
    setCo2Emissions(co2);
  };

  const handleSave = () => {
    calculateCO2Emissions();
    console.log('Saving data...');
  };

  const deviceOptions = [
    { value: 'tv', label: 'TV', icon: <TvIcon /> },
    { value: 'fridge', label: 'Fridge', icon: <FridgeIcon /> },
    { value: 'washing-machine', label: 'Washing Machine', icon: <WashingMachineIcon /> },
  ];

  return (
    <>
      <HomeAppliances />
      <StyledContainer sx={{ marginTop: '150px' }}>
        <StyledDiv>
          <StyledTypography variant="h5" style={{ marginTop: '5px', fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px' }}>Eco-Watch: Home Appliance Efficiency Monitor</StyledTypography>
          <Grid container spacing={3}>
            <StyledFormItem item xs={12}>
              <StyledInputLabel htmlFor="device-type">Type of Device</StyledInputLabel>
              <FormControl fullWidth>
                <Select
                  labelId="device-type-label"
                  id="device-type"
                  value={selectedDevice}
                  onChange={handleSelectedDeviceChange}

                >
                  {deviceOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </MenuItem>
                  ))}
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
                inputProps={{ style: { fontSize: '1.2rem', color: 'black' } }}
              />
            </StyledFormItem>
            <StyledFormItem item xs={12}>
              <Button variant="contained" color="success" onClick={handleSave} style={{ width: '100%' }}>Save</Button>
            </StyledFormItem>
            <StyledFormItem item xs={12}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant="h6">
                {co2Emissions > 0 ? `Estimated CO2 Emissions: ${co2Emissions} kg` : ''}
              </Typography>
            </StyledFormItem>
          </Grid>
        </StyledDiv>
      </StyledContainer>
    </>
  );
};

export default AppliancesPage;
