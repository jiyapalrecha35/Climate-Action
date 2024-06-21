import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Slider, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { Fireplace, Water, BatteryCharging90, Business, Delete, EmojiObjects } from '@mui/icons-material';
import WindPowerIcon from '@mui/icons-material/WindPower';
import ForestIcon from '@mui/icons-material/Forest';
import projectDetails from './projectDetails';
import image from './image.jpg';

const SavingsComponent = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [carbonOffsets, setCarbonOffsets] = useState(1);
  const [additionalField, setAdditionalField] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [goals, setGoals] = useState('');
  const [impactDiary, setImpactDiary] = useState('');
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiKey = '';

  const projectValues = {
    "Forestry/Plantation": { value: 100, icon: <ForestIcon /> },
    "Clean Cookstoves": { value: 150, icon: <Fireplace /> },
    "Renewable: Windfarms": { value: 200, icon: <WindPowerIcon /> },
    "Renewable: Biomass Energy": { value: 250, icon: <BatteryCharging90 /> },
    "Renewable: Hydroelectric Dams": { value: 300, icon: <Water /> },
    "Destruction of Industrial Pollutants": { value: 350, icon: <Business /> },
    "Destruction of Landfill Methane": { value: 400, icon: <Delete /> },
    "Other Projects": { value: 100, icon: <EmojiObjects /> }
  };

  const calculateTotalSavings = () => {
    const project = projectValues[selectedProject] || { value: 0 };
    return project.value * carbonOffsets;
  };

  const handleChangeProject = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleChangeCarbonOffsets = (event, newValue) => {
    setCarbonOffsets(newValue);
  };

  const handleChangeAdditionalField = (event) => {
    setAdditionalField(event.target.value);
  };

  const handleAddToWishlist = () => {
    if (additionalField.trim() !== '') {
      setWishlist([...wishlist, additionalField]);
      setAdditionalField('');
    }
  };

  const handleChangeGoals = (event) => {
    setGoals(event.target.value);
  };

  const handleChangeImpactDiary = (event) => {
    setImpactDiary(event.target.value);
  };

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      let prompt = `Generate recommendations, todos, and plus points based on the following:\n\n`;
      prompt += `Selected Project: ${selectedProject}\n`;
      prompt += `Number of Carbon Offsets: ${carbonOffsets}\n`;

      if (wishlist.length > 0) {
        prompt += `Green Products Wishlist:\n`;
        wishlist.forEach((item, index) => {
          prompt += `${index + 1}. ${item}\n`;
        });
      }

      prompt += `Personal Environmental Goals:\n${goals}\n`;
      prompt += `Environmental Impact Diary:\n${impactDiary}\n`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
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
      setShowResponse(true);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Box sx={{ flex: 1, maxWidth: '750px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', fontFamily: 'Poppins, sans-serif' }}>
        <Typography variant="h4" gutterBottom fontFamily="Poppins" fontWeight="bold" marginBottom='50px'>
          Sustainable Lifestyle Planner
        </Typography>

        <Typography sx={{ marginTop: '30px', marginBottom: '30px', fontStyle: 'italic', fontFamily: 'Poppins' }}>
          Great news: eco-conscious living is in! The challenge: every action leaves a carbon footprint. But fear not! You can shrink your ecological footprint in three easy steps: minimize, assess, neutralize.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '20px', color: '#757575', fontFamily: 'Poppins' }}>
          Total savings: ₹{calculateTotalSavings()}
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: '20px', fontFamily: 'Poppins' }}>
          <InputLabel id="project-select-label" sx={{ fontFamily: 'Poppins' }}>Select Project</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={selectedProject}
            label="Select Project"
            onChange={handleChangeProject}
            sx={{ textAlign: 'left', fontFamily: 'Poppins' }}
          >
            {projectDetails.map((project, index) => (
              <MenuItem key={index} value={project} sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Poppins' }}>
                {projectValues[project].icon}
                <span style={{ marginLeft: '10px' }}>{project}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: '10px', fontFamily: 'Poppins' }}>Number of Carbon Offsets</Typography>
        <Box width="100%" marginBottom="20px">
          <Slider
            value={carbonOffsets}
            onChange={handleChangeCarbonOffsets}
            aria-labelledby="carbon-offsets-slider"
            step={1}
            marks
            min={1}
            max={20}
            sx={{ fontFamily: 'Poppins' }}
          />
          <Typography fontFamily="Poppins">Value: {carbonOffsets}</Typography>
        </Box>
        <TextField
          id="additional-field"
          label="Additional Field"
          value={additionalField}
          onChange={handleChangeAdditionalField}
          fullWidth
          sx={{ marginBottom: '20px', fontFamily: 'Poppins' }}
          variant="outlined"
        />
        <Button variant="contained" onClick={handleAddToWishlist} sx={{ marginBottom: '20px', backgroundColor: '#4caf50', color: 'white', fontFamily: 'Poppins' }}>
          Add to Wishlist
        </Button>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: '10px', fontFamily: 'Poppins' }}>Green Products Wishlist</Typography>
        <Box sx={{ textAlign: 'left', marginBottom: '20px', paddingLeft: '20px', color: '#757575', fontFamily: 'Poppins' }}>
          {wishlist.map((item, index) => (
            <Typography key={index} component="li" fontFamily="Poppins">{item}</Typography>
          ))}
        </Box>
        <TextField
          id="goals"
          label="Personal Environmental Goals"
          value={goals}
          onChange={handleChangeGoals}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: '20px', fontFamily: 'Poppins' }}
          variant="outlined"
        />
        <TextField
          id="impact-diary"
          label="Environmental Impact Diary"
          value={impactDiary}
          onChange={handleChangeImpactDiary}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: '20px', fontFamily: 'Poppins' }}
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={generateRecommendations}
          sx={{ marginBottom: '20px', backgroundColor: '#2196f3', color: 'white', fontFamily: 'Poppins' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Generate Recommendations'}
        </Button>
        {showResponse && (
          <Box textAlign="left" padding="20px" border="1px solid #ccc" borderRadius="8px" bgcolor="#fff" fontFamily="Poppins">
            <Typography variant="h6" sx={{ marginBottom: '10px', fontFamily: 'Poppins' }}>Recommendations:</Typography>
            <Typography sx={{ whiteSpace: 'pre-line', color: '#424242', fontFamily: 'Poppins' }}>{response}</Typography>
          </Box>
        )}
      </Box>
      <Box
        width="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        overflow="hidden"
        sx={{ padding: '20px' }}
      >
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <img src={image} alt="background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default SavingsComponent;
