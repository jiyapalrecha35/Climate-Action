package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.example.backend.models.WaterHeaterRequest;
import com.example.backend.models.WaterHeaterResponse;

@RestController
@RequestMapping("/api/calculate/water-heater")
@CrossOrigin(origins = "http://localhost:3000")
public class WaterHeaterController {

    @PostMapping
    public WaterHeaterResponse calculateCO2(@RequestBody WaterHeaterRequest request) {
        double co2EmissionFactor = getEmissionFactor(request.getSelectedDevice());
        double totalEnergy = request.getEnergyConsumption() * request.getNumberOfHours();
        double co2Emitted = totalEnergy * co2EmissionFactor;
        return new WaterHeaterResponse(co2Emitted);
    }

    private double getEmissionFactor(String deviceType) {
        switch (deviceType) {
            case "solar":
                return 0.05;
            case "gas-geaser":
                return 0.2;
            case "electric-coil":
                return 0.4;
            case "kettle":
                return 0.3;
            default:
                return 0.1;
        }
    }
}
