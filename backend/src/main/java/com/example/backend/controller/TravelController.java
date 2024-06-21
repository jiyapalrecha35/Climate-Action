package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.models.TravelRequest;
import com.example.backend.models.TravelResponse;

@RestController
@RequestMapping("/api") // Add a common base path
@CrossOrigin(origins = "http://localhost:3000")
public class TravelController {

    @PostMapping("/travel/calculate")
    public ResponseEntity<TravelResponse> calculateExpense(@RequestBody TravelRequest request) {
        double co2Emissions = calculateCO2Emissions(request.getDistance(), request.getVehicle(), request.getMileage());
        double carbonFootprint = calculateCarbonFootprint(co2Emissions);

        TravelResponse response = new TravelResponse(co2Emissions, carbonFootprint);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private double calculateCO2Emissions(double distance, String vehicle, double mileage) {
        double emissionFactor = 0;

        switch (vehicle.toLowerCase()) {
            case "car":
            case "bike":
            case "scooter":
                emissionFactor = 2.27; // Petrol
                break;
            case "bus":
            case "truck":
            case "van":
            case "boat":
                emissionFactor = 2.64; // Diesel
                break;
            case "electriccar":
                emissionFactor = 0.37; // Electricity
                break;
            case "helicopter":
            case "jet":
                emissionFactor = 3.15; // Aviation fuel (Jet-A)
                break;
            default:
                throw new IllegalArgumentException("Unknown vehicle type: " + vehicle);
        }

        double fuelConsumptionPerDistance = 1 / mileage; // In liters per km
        double co2Emissions = distance * fuelConsumptionPerDistance * emissionFactor;

        return co2Emissions;
    }

    private double calculateCarbonFootprint(double co2Emissions) {
        // Assuming carbon footprint calculation involves distance and CO2 emissions
        // This could involve other factors based on different methods of calculation
        return 0.1*co2Emissions; // Total CO2 emissions is used as carbon footprint in kg
    }
}
