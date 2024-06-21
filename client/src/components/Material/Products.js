// Car (Petrol): 2.31 kg CO2/kg
// Car (Diesel): 2.68 kg CO2/kg
// Car (Electricity): 0.0 kg CO2/kg (assuming renewable energy)
// Motorcycle (Petrol): 2.05 kg CO2/kg
// Beef: 27.0 kg CO2/kg
// Pork: 12.1 kg CO2/kg
// Fish: 6.1 kg CO2/kg
// Poultry: 6.9 kg CO2/kg
// Rice: 2.7 kg CO2/kg
// Mobile: 86.0 kg CO2/kg
// Tablet: 105.0 kg CO2/kg
// TV: 140.0 kg CO2/kg
// Laptop: 200.0 kg CO2/kg
// Large Appliance: 100.0 kg CO2/kg
// Small Appliance: 20.0 kg CO2/kg
// Cotton: 5.9 kg CO2/kg
// Silk: 13.6 kg CO2/kg
// Denim: 9.3 kg CO2/kg
// Furniture: 3.5 kg CO2/kg
// House: 150.0 kg CO2/kg
// Dry Waste: 0.5 kg CO2/kg
// Wet Waste: 1.0 kg CO2/kg
import React, { useState } from 'react';
import { Container, Grid, Slider, Select, MenuItem, FormControl, InputLabel, TextField, styled, Typography, Button } from '@mui/material';
import { DirectionsCar as CarIcon, TwoWheeler as MotorcycleIcon, Fastfood as FoodIcon, Laptop as LaptopIcon, Tv as TVIcon, Kitchen as KitchenIcon, House as HouseIcon, Chair as FurnitureIcon, LocalDrink as WaterIcon, DirectionsBike as BikeIcon, Build as TechIcon, LocalMall as ClothingIcon, DeleteForever as WasteIcon, WaterDrop as WetWasteIcon, Dry as DryWasteIcon, Iron as SmallAppIcon, LocalGasStation as FuelIcon, Tablet as TabletIcon, Smartphone as PhoneIcon, DevicesOther as ITicon, SetMeal as FishIcon, RiceBowl as RiceIcon, KebabDining as MeatIcon, EvStation as EvIcon, Category as CategoryIcon, MonitorWeight as WeightICON } from '@mui/icons-material';
import MaterialNavbar from './Nav';


// StyledContainer component with custom styling
const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  width: '800px', // Set width to 750px
  margin: '0 auto', // Center align the container
  padding: '20px',
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)', // Add box shadow
  backgroundColor: '#fafafa',
  borderRadius: '10px',
  fontFamily: 'Poppins, sans-serif',
  marginTop: '50px'
});

const StyledDiv = styled('div')(({ theme }) => ({
  borderRadius: '10px',
  width: '100%',
  padding: theme.spacing(3),
  margin: 'auto',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  // boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)', // Add box shadow
  backgroundColor: '#fafafa',
  fontFamily: 'Poppins, sans-serif',
}));

const StyledFormItem = styled(Grid)({
  marginBottom: '20px',
});

const StyledInputLabel = styled(InputLabel)({
  fontSize: '1rem',
  fontFamily: 'Poppins, sans-serif',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
});

const StyledSelect = styled(Select)({
  '& .MuiSelect-root': {
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
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
  color: 'black',
  fontSize: '1rem',
  fontFamily: 'Poppins, sans-serif',
});

const StyledButton = styled(Button)({
  fontSize: '1rem',
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: '#1976d2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#115293',
  },
});

const ProductsPage = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');
  const [weight, setWeight] = useState(0); // Default weight value
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [emissions, setEmissions] = useState(0); // Default CO2 emissions value

  const emissionFactors = {
    Transport: {
      Car: { Petrol: 2.31, Diesel: 2.68, Electricity: 0.0 },
      Motorcycle: { Petrol: 2.05 },
    },
    Food: {
      Beef: 27.0,
      Pork: 12.1,
      Fish: 6.1,
      Poultry: 6.9,
      Rice: 2.7,
    },
    InformationTech: {
      Mobile: 86.0,
      Tablet: 105.0,
      TV: 140.0,
      Laptop: 200.0,
    },
    Appliances: {
      Large: 100.0,
      Small: 20.0,
    },
    ClothingFootware: {
      Cotton: 5.9,
      Silk: 13.6,
      Denim: 9.3,
    },
    HousingFurniture: {
      Furniture: 3.5,
      House: 150.0,
    },
    WasteDisposal: {
      Dry: 0.5,
      Wet: 1.0,
    },
  };

  

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    // Reset sub-category, sub-sub-category, weight, date, notes, and emissions when category changes
    setSubCategory('');
    setSubSubCategory('');
    setWeight(0);
    setDate('');
    setNotes('');
    setEmissions(0);
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategory = event.target.value;
    setSubCategory(selectedSubCategory);
    // Reset sub-sub-category and emissions when sub-category changes
    setSubSubCategory('');
    setEmissions(0);
  };

  const handleSubSubCategoryChange = (event) => {
    const selectedSubSubCategory = event.target.value;
    setSubSubCategory(selectedSubSubCategory);
    // Recalculate emissions when sub-sub-category changes
    calculateEmissions(weight, selectedSubSubCategory);
  };

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
    // Recalculate emissions when weight changes
    calculateEmissions(newValue, subSubCategory);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const calculateEmissions = (weight, subSubCategory) => {
    let ef = 0;
    if (category && subCategory) {
      if (category === 'Transport' && subSubCategory) {
        ef = emissionFactors[category][subCategory][subSubCategory] || 0;
      } else {
        ef = emissionFactors[category][subCategory] || 0;
      }
    }
    const emissions = weight * ef;
    setEmissions(emissions);
  };

  const renderSubCategoryField = () => {
    switch (category) {
      case 'Transport':
        return (
          <>
            <StyledTypography item xs={12}>Type of Transport</StyledTypography>
            <StyledFormItem item xs={12}>
              <FormControl fullWidth>
                <Select
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="Car"><CarIcon />Car</MenuItem>
                  <MenuItem value="Motorcycle"><MotorcycleIcon />Motorcycle</MenuItem>
                </Select>
              </FormControl>
            </StyledFormItem>
            {subCategory && (
              <>
                <StyledTypography>Type of Fuel</StyledTypography>
                <StyledFormItem item xs={12}>
                  <FormControl fullWidth>
                    <Select
                      value={subSubCategory}
                      onChange={handleSubSubCategoryChange}
                    >
                      <MenuItem value="Petrol"><FuelIcon />Petrol</MenuItem>
                      <MenuItem value="Diesel"><FuelIcon />Diesel</MenuItem>
                      <MenuItem value="Electricity"><EvIcon />Electricity</MenuItem>
                    </Select>
                  </FormControl>
                </StyledFormItem>
              </>
            )}
          </>
        );
      case 'Food':
        return (
          <>
            <StyledTypography>Type of Food</StyledTypography>
            <StyledFormItem item xs={12}>
              <FormControl fullWidth>
                <Select
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="Beef"><MeatIcon />Beef</MenuItem>
                  <MenuItem value="Pork"><MeatIcon />Pork</MenuItem>
                  <MenuItem value="Fish"><FishIcon />Fish</MenuItem>
                  <MenuItem value="Poultry"><MeatIcon />Poultry</MenuItem>
                  <MenuItem value="Rice"><RiceIcon />Rice</MenuItem>
                </Select>
              </FormControl>
            </StyledFormItem>
          </>
        );
      case 'InformationTech':
        return (
          <>
            <StyledTypography>Type of Device</StyledTypography>
            <StyledFormItem item xs={12}>
              <FormControl fullWidth>
                <Select
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="Mobile"><PhoneIcon />Mobile</MenuItem>
                  <MenuItem value="Tablet"><TabletIcon />Tablet</MenuItem>
                  <MenuItem value="TV"><TVIcon />TV</MenuItem>
                  <MenuItem value="Laptop"><LaptopIcon />Laptop</MenuItem>
                </Select>
              </FormControl>
            </StyledFormItem>
          </>
        );
      case 'Appliances':
        return (
          <>
            <StyledTypography>Type of Appliance</StyledTypography>
            <StyledFormItem item xs={12}>
              <FormControl fullWidth>
                <Select
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="Large"><SmallAppIcon />Large</MenuItem>
                  <MenuItem value="Small"><SmallAppIcon />Small</MenuItem>
                </Select>
              </FormControl>
            </StyledFormItem>
          </>
        );
      case 'ClothingFootware':
        return (
          <>
            <StyledTypography>Type of Material</StyledTypography>
            <StyledFormItem item xs={12}>
              <FormControl fullWidth>
                <Select
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="Cotton"><ClothingIcon />Cotton</MenuItem>
                  <MenuItem value="Silk"><ClothingIcon />Silk</MenuItem>
                  <MenuItem value="Denim"><ClothingIcon />Denim</MenuItem>
                </Select>
              </FormControl>
            </StyledFormItem>
          </>
        );
      case 'HousingFurniture':
        return (
          <>
            <StyledTypography>Type of Housing or Furniture</StyledTypography>
            <StyledFormItem item xs={12}>
              <FormControl fullWidth>
                <Select
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="Furniture"><FurnitureIcon />Furniture</MenuItem>
                  <MenuItem value="House"><HouseIcon />House</MenuItem>
                </Select>
              </FormControl>
            </StyledFormItem>
          </>
        );
      case 'WasteDisposal':
        return (
          <>
            <StyledTypography>Type of Waste</StyledTypography>
            <StyledFormItem item xs={12}>
              <FormControl fullWidth>
                <Select
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="Dry"><DryWasteIcon />Dry</MenuItem>
                  <MenuItem value="Wet"><WetWasteIcon />Wet</MenuItem>
                </Select>
              </FormControl>
            </StyledFormItem>
          </>
        );
      default:
        return null;
    }
  };

  const renderWeightField = () => {
    switch (category) {
      case 'Transport':
        return (
          <>
            <StyledTypography>Distance in km</StyledTypography>
            <StyledSliderContainer>
              <Slider
                value={weight}
                onChange={handleWeightChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
              />
              <StyledTypography>{weight} km</StyledTypography>
            </StyledSliderContainer>
          </>
        );
      case 'Food':
        return (
          <>
            <StyledTypography>Weight in kg</StyledTypography>
            <StyledSliderContainer>
              <Slider
                value={weight}
                onChange={handleWeightChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
              <StyledTypography>{weight} kg</StyledTypography>
            </StyledSliderContainer>
          </>
        );
      case 'InformationTech':
        return (
          <>
            <StyledTypography>Number of Devices</StyledTypography>
            <StyledSliderContainer>
              <Slider
                value={weight}
                onChange={handleWeightChange}
                valueLabelDisplay="auto"
                min={0}
                max={10}
              />
              <StyledTypography>{weight} devices</StyledTypography>
            </StyledSliderContainer>
          </>
        );
      case 'Appliances':
        return (
          <>
            <StyledTypography>Number of Appliances</StyledTypography>
            <StyledSliderContainer>
              <Slider
                value={weight}
                onChange={handleWeightChange}
                valueLabelDisplay="auto"
                min={0}
                max={10}
              />
              <StyledTypography>{weight} appliances</StyledTypography>
            </StyledSliderContainer>
          </>
        );
      case 'ClothingFootware':
        return (
          <>
            <StyledTypography>Number of Clothing Items</StyledTypography>
            <StyledSliderContainer>
              <Slider
                value={weight}
                onChange={handleWeightChange}
                valueLabelDisplay="auto"
                min={0}
                max={50}
              />
              <StyledTypography>{weight} items</StyledTypography>
            </StyledSliderContainer>
          </>
        );
      case 'HousingFurniture':
        return (
          <>
            <StyledTypography>Number of Items</StyledTypography>
            <StyledSliderContainer>
              <Slider
                value={weight}
                onChange={handleWeightChange}
                valueLabelDisplay="auto"
                min={0}
                max={50}
              />
              <StyledTypography>{weight} items</StyledTypography>
            </StyledSliderContainer>
          </>
        );
      case 'WasteDisposal':
        return (
          <>
            <StyledTypography>Weight in kg</StyledTypography>
            <StyledSliderContainer>
              <Slider
                value={weight}
                onChange={handleWeightChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
              <StyledTypography>{weight} kg</StyledTypography>
            </StyledSliderContainer>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MaterialNavbar />
      <StyledContainer sx={{marginTop:'150px'}}>
        <StyledDiv>
          <Grid container spacing={3} justifyContent='center'>
            <StyledTypography variant="h2" gutterBottom style={{ marginTop:'10px',fontSize:'30px',fontWeight: 'bold' }}>
            InventorEye: Product Stock Surveillance
            </StyledTypography>

            <StyledFormItem item xs={12}>
              <FormControl fullWidth>
                <StyledInputLabel>Select Category</StyledInputLabel>
                <StyledSelect value={category} onChange={handleCategoryChange}>
                  <MenuItem value="Transport"><BikeIcon />Transport</MenuItem>
                  <MenuItem value="Food"><FoodIcon />Food</MenuItem>
                  <MenuItem value="InformationTech"><ITicon />Information Tech</MenuItem>
                  <MenuItem value="Appliances"><KitchenIcon />Appliances</MenuItem>
                  <MenuItem value="ClothingFootware"><ClothingIcon />Clothing and Footware</MenuItem>
                  <MenuItem value="HousingFurniture"><HouseIcon />Housing and Furniture</MenuItem>
                  <MenuItem value="WasteDisposal"><WaterIcon />Waste Disposal</MenuItem>
                </StyledSelect>
              </FormControl>
            </StyledFormItem>

            {renderSubCategoryField()}

            <StyledFormItem item xs={12}>
              {renderWeightField()}
            </StyledFormItem>

            <StyledFormItem item xs={12}>
              <StyledTextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={handleDateChange}
              />
            </StyledFormItem>

            {/* <StyledFormItem item xs={12}>
              <StyledTextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={notes}
                onChange={handleNotesChange}
              />
            </StyledFormItem> */}

            <StyledTypography variant="h6" gutterBottom>
              Estimated CO2 Emissions: {emissions.toFixed(2)} kg
            </StyledTypography>

            {/* <StyledButton variant="contained">Calculate</StyledButton> */}
          </Grid>
        </StyledDiv>
      </StyledContainer>
    </>
  );
};

export default ProductsPage;
