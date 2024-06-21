package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.example.backend.models.HeaterRequest;
import com.example.backend.models.HeaterResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HeaterController {

    @PostMapping("/calculate/heater")
    public HeaterResponse calculateEmissions(@RequestBody HeaterRequest request) {
        double emissionFactor = getEmissionFactor(request.getSelectedDevice(), request.getFuelType());
        double annualConsumption = calculateAnnualConsumption(request.getEnergyConsumption(), request.getUsageFrequency(), request.getNumberOfHours());
        double co2Emissions = annualConsumption * emissionFactor;
        return new HeaterResponse(co2Emissions);
    }

    private double getEmissionFactor(String selectedDevice, String fuelType) {
        if ("electric".equalsIgnoreCase(selectedDevice)) {
            return 0.8;
        }
        switch (fuelType.toLowerCase()) {
            case "natural-gas":
                return 2.3;
            case "fuel-oil":
                return 2.6;
            case "coal":
                return 2.5;
            default:
                return 0;
        }
    }

    private double calculateAnnualConsumption(double energyConsumption, String usageFrequency, int numberOfHours) {
        switch (usageFrequency.toLowerCase()) {
            case "daily":
                return energyConsumption * numberOfHours * 365;

            case "weekly":
                return energyConsumption * numberOfHours * 52;
            case "monthly":
                return energyConsumption * numberOfHours * 12;
            default:
                return 0;
        }
    }
}
