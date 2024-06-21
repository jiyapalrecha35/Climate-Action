import React, { useState } from 'react';
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Stack } from '@mui/material';
import image from './image.jpg';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

const Travel = () => {
    const [distance, setDistance] = useState('');
    const [mileage, setMileage] = useState({
        car: '',
        bike: '',
        bus: '',
        electricCar: '',
        scooter: '',
        truck: '',
        van: '',
        helicopter: '',
        jet: '',
        boat: ''
    });
    const [vehicle, setVehicle] = useState('');
    const [insteadOfVehicle, setInsteadOfVehicle] = useState('');
    const [insteadOfMileage, setInsteadOfMileage] = useState('');
    const [traveledCO2, setTraveledCO2] = useState(0);
    const [traveledCarbonFootprint, setTraveledCarbonFootprint] = useState(0);
    const [alternateCO2, setAlternateCO2] = useState(0);
    const [alternateCarbonFootprint, setAlternateCarbonFootprint] = useState(0);
    const [co2Saved, setCO2Saved] = useState(0);

    const handleCalculateExpense = async () => {
        try {
            // Validate mileage and insteadOfMileage inputs
            if (parseInt(distance) < 0) {
                alert('Distance travelled can\'t be negative!');
                return;
            }
            if (parseFloat(mileage[vehicle]) < 0 || parseFloat(insteadOfMileage) < 0) {
                alert("Mileage values cannot be negative!");
                return;
            }

            // Fetch for traveled vehicle
            const traveledResponse = await fetch('http://localhost:8080/api/travel/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    distance: parseFloat(distance),
                    vehicle: vehicle,
                    mileage: parseFloat(mileage[vehicle])
                })
            });

            if (!traveledResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const traveledData = await traveledResponse.json();
            setTraveledCO2(traveledData.co2Emissions.toFixed(2));
            setTraveledCarbonFootprint(traveledData.carbonFootprint.toFixed(2));

            // Fetch for alternate vehicle
            const alternateResponse = await fetch('http://localhost:8080/api/travel/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    distance: parseFloat(distance),
                    vehicle: insteadOfVehicle,
                    mileage: parseFloat(insteadOfMileage)
                })
            });

            if (!alternateResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const alternateData = await alternateResponse.json();
            setAlternateCO2(alternateData.co2Emissions.toFixed(2));
            setAlternateCarbonFootprint(alternateData.carbonFootprint.toFixed(2));
            const savedCO2 = parseFloat(alternateData.co2Emissions.toFixed(2)) - parseFloat(traveledData.co2Emissions.toFixed(2));
            setCO2Saved(savedCO2);
        } catch (error) {
            console.error('Error calculating CO2 emissions:', error);
        }
    };

    const handleInsteadOfVehicleChange = (e) => {
        setInsteadOfVehicle(e.target.value);
        setInsteadOfMileage('');
    };

    const handleInsteadOfMileageChange = (e) => {
        setInsteadOfMileage(e.target.value);
    };

    const handleMileageChange = (vehicleType, value) => {
        setMileage(prevState => ({
            ...prevState,
            [vehicleType]: value
        }));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px', backgroundColor: '#f0f2f5' }}>
            <Box sx={{ flex: 1, maxWidth: '750px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins, Arial, sans-serif',fontWeight:'bold' ,marginBottom:'50px' }}>
                Carbon Conscious Travel Calculator
                </Typography>
                <Typography sx={{ marginTop: '30px', marginBottom: '30px', fontStyle: 'italic', fontFamily: 'Poppins, Arial, sans-serif' }}>
                    Good news: traveling is back! The bad news: our travel leaves a trail of greenhouse gas footprints. Fortunately, you can lighten your travel impacts in three simple steps: reduce, calculate, offset.
                </Typography>

                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Distance Traveled (km)"
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                        InputProps={{ inputProps: { min: 1 } }}
                    />
                    <FormControl fullWidth>
                        <InputLabel sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>Travelled by which vehicle:</InputLabel>
                        <Select value={vehicle} onChange={(e) => setVehicle(e.target.value)} sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="car"><DirectionsCarIcon /> Car</MenuItem>
                            <MenuItem value="bike"><TwoWheelerIcon /> Bike</MenuItem>
                            <MenuItem value="bus"><DirectionsBusIcon /> Bus</MenuItem>
                            <MenuItem value="electricCar"><ElectricCarIcon /> Electric Car</MenuItem>
                            <MenuItem value="scooter"><SportsMotorsportsIcon /> Scooter</MenuItem>
                            <MenuItem value="truck"><LocalShippingIcon /> Truck</MenuItem>
                            <MenuItem value="van"><LocalShippingIcon /> Van</MenuItem>
                            <MenuItem value="helicopter"><AirplanemodeActiveIcon /> Helicopter</MenuItem>
                            <MenuItem value="jet"><AirplanemodeActiveIcon /> Jet</MenuItem>
                            <MenuItem value="boat"><DirectionsBoatIcon /> Boat</MenuItem>
                        </Select>
                    </FormControl>
                    {vehicle && (
                        <TextField
                            fullWidth
                            label={`Mileage (km/${vehicle})`}
                            type="number"
                            value={mileage[vehicle]}
                            onChange={(e) => handleMileageChange(vehicle, e.target.value)}
                            sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                            InputProps={{ inputProps: { min: 1 } }}
                        />
                    )}
                    <FormControl fullWidth>
                        <InputLabel sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>Instead of which vehicle:</InputLabel>
                        <Select value={insteadOfVehicle} onChange={handleInsteadOfVehicleChange} sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="car"><DirectionsCarFilledIcon /> Car</MenuItem>
                            <MenuItem value="bike"><DirectionsBikeIcon /> Bike</MenuItem>
                            <MenuItem value="bus"><DirectionsBusIcon /> Bus</MenuItem>
                            <MenuItem value="electricCar"><ElectricCarIcon /> Electric Car</MenuItem>
                            <MenuItem value="scooter"><SportsMotorsportsIcon /> Scooter</MenuItem>
                            <MenuItem value="truck"><LocalShippingIcon /> Truck</MenuItem>
                            <MenuItem value="van"><LocalShippingIcon /> Van</MenuItem>
                            <MenuItem value="helicopter"><AirplanemodeActiveIcon /> Helicopter</MenuItem>
                            <MenuItem value="jet"><AirplanemodeActiveIcon /> Jet</MenuItem>
                            <MenuItem value="boat"><DirectionsBoatFilledIcon /> Boat</MenuItem>
                        </Select>
                    </FormControl>
                    {insteadOfVehicle && (
                        <TextField
                            fullWidth
                            label={`Mileage (km/${insteadOfVehicle})`}
                            type="number"
                            value={insteadOfMileage}
                            onChange={handleInsteadOfMileageChange}
                            sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                            InputProps={{ inputProps: { min: 1 } }}
                        />
                    )}
                    <Button variant="contained" onClick={handleCalculateExpense} fullWidth sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                        Calculate Final Expense
                    </Button>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>CO2 Emitted by Traveled Vehicle: {traveledCO2} tons</Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>Carbon Footprint Emitted by Traveled Vehicle: {traveledCarbonFootprint} kg</Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>CO2 Emitted by Alternate Vehicle: {alternateCO2} tons</Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>Carbon Footprint Emitted by Alternate Vehicle: {alternateCarbonFootprint} kg</Typography>
                    {co2Saved >= 0 ? (
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>CO2 Saved: {co2Saved} tons</Typography>
                    ) : (
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>Extra CO2 Emitted: {Math.abs(co2Saved)} tons</Typography>
                    )}
                </Stack>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', overflow: 'hidden' }}>
          <div style={{ width: '95%', height: '100%', borderRadius: '10px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <img src={image} alt="background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Box>
        </Box>
    );
};

export default Travel;
