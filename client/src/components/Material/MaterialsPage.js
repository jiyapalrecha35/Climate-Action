import React, { useState, useEffect } from 'react';
import { Container, Grid, Slider, Select, MenuItem, FormControl, InputLabel, TextField, styled, Typography, Button, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { AcUnit as SteelIcon, EmojiObjects as StainlessSteelIcon, TakeoutDining as AluminiumIcon, Tungsten as CopperIcon, Polyline as PlasticIcon, FreeBreakfast as CeramicsIcon, LocalBar as GlassIcon, AutoStories as PaperIcon, Pets as SkinIcon } from '@mui/icons-material';
import MaterialNavbar from './Nav';

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
  marginBottom: '20px',
  fontFamily: 'Poppins, sans-serif',
});

const StyledInputLabel = styled(InputLabel)({
  fontSize: '1rem',
  fontFamily: 'Poppins, sans-serif',
});

const StyledTypography = styled(Typography)({
  fontSize: '1rem',
  color: 'black',
  fontFamily: 'Poppins, sans-serif',
});

const StyledSliderContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: 'black',
  fontSize: '1rem',
  fontFamily: 'Poppins, sans-serif',
});

const MaterialsPage = () => {
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [used, setUsed] = useState(false);
  const [emissions, setEmissions] = useState(0);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const apikey='';

  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
  };

  const handleQuantityChange = (event, newValue) => {
    setQuantity(newValue);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleUsedChange = (event) => {
    setUsed(event.target.checked);
  };

  const calculateEmissions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/material/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          material,
          quantity
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setEmissions(data.emissions);
    } catch (error) {
      console.error('Error calculating emissions', error);
    }
  };

  useEffect(() => {
    calculateEmissions();
  }, [material, quantity]);

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      let prompt = `Generate recommendations for climate action and sustainable material alternatives based on your notes and material: ${material}\n\n`;
      prompt += `Notes: ${notes}\n\n`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api-key}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7
        }),
      });

      const data = await response.json();
      const generatedText = data.choices[0].message.content;
      setResponse(generatedText);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      await calculateEmissions();
      if (used) {
        await generateRecommendations();
      }
    } catch (error) {
      console.error('Error calculating emissions or generating recommendations', error);
    }
  };

  return (
    <>
      <MaterialNavbar />
      <StyledContainer sx={{marginTop:'150px'}}>
        <StyledDiv container spacing={3} justifyContent='center'>
          <StyledTypography variant="h2" gutterBottom style={{marginTop:'5px',fontSize: '30px', fontWeight: 'bold', textAlign: 'center',marginBottom:'50px' }}>
          MatRover: Material Navigator & Tracker
          </StyledTypography>
          <StyledFormItem container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <StyledInputLabel>Material Used</StyledInputLabel>
                <Select value={material} onChange={handleMaterialChange}>
                  <MenuItem value="Steel"><SteelIcon />Steel</MenuItem>
                  <MenuItem value="Stainless Steel"><StainlessSteelIcon />Stainless Steel</MenuItem>
                  <MenuItem value="Aluminium"><AluminiumIcon />Aluminium</MenuItem>
                  <MenuItem value="Copper"><CopperIcon />Copper</MenuItem>
                  <MenuItem value="Plastic"><PlasticIcon />Plastic</MenuItem>
                  <MenuItem value="Ceramics"><CeramicsIcon />Ceramics</MenuItem>
                  <MenuItem value="Glass"><GlassIcon />Glass</MenuItem>
                  <MenuItem value="Paper"><PaperIcon />Paper</MenuItem>
                  <MenuItem value="Skin"><SkinIcon />Animal Skin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={used} onChange={handleUsedChange} />}
                label="Used"
              />
            </Grid>
            <StyledFormItem item xs={12}>
              <StyledTypography>Quantity (in kg)</StyledTypography>
              <StyledSliderContainer>
                <Slider
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={0}
                  max={100}
                  step={1}
                  valueLabelDisplay="auto"
                />
                <Typography variant="body1">{quantity} kg</Typography>
              </StyledSliderContainer>
            </StyledFormItem>
            <Grid item xs={12}>
              <StyledTypography>Date</StyledTypography>
              <TextField
                variant="outlined"
                fullWidth
                type="date"
                value={date}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTypography>Additional Notes</StyledTypography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={notes}
                onChange={handleNotesChange}
              />
            </Grid>
          </StyledFormItem>
          <Button variant="contained" color="success" fullWidth onClick={handleSave}>
            Save
          </Button>
          {loading && (
            <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
              Loading...
            </Typography>
          )}
          {emissions > 0 && (
            <Typography variant="h6" style={{ fontFamily:'Poppins',marginTop: '20px', textAlign: 'center' }}>
              CO2 Emissions: {emissions.toFixed(2)} kg CO2
            </Typography>
          )}
          {response && (
            <Typography variant="h6" style={{ fontFamily:'Poppins', marginTop: '20px', textAlign: 'center' }}>
              Recommendations: {response}
            </Typography>
          )}
        </StyledDiv>
      </StyledContainer>
    </>
  );
};

export default MaterialsPage;
