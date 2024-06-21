package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.example.backend.models.AcRequest;
import com.example.backend.models.AcResponse;

@RestController
@RequestMapping("/api/calculate/ac")
@CrossOrigin(origins = "http://localhost:3000")
public class AcController {

    @PostMapping
    public AcResponse calculateCO2(@RequestBody AcRequest request) {
        double emissionFactor = 0.92; // kg CO2 per kWh
        double totalEnergy = request.getNumberOfUnits() * request.getRatingPerUnit() * request.getNumberOfHours();
        double co2Emitted = totalEnergy * emissionFactor;
        return new AcResponse(co2Emitted);
    }
}

