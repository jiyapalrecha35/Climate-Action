package com.example.backend.controller;
import org.springframework.web.bind.annotation.*;
import com.example.backend.models.EmissionsRequest;
import com.example.backend.models.EmissionsResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/material")
public class MaterialController {

    @PostMapping("/calculate")
    public EmissionsResponse calculateEmissions(@RequestBody EmissionsRequest request) {
        double emissionsFactor = getEmissionFactor(request.getMaterial());
        double emissions = request.getQuantity() * emissionsFactor;
        double carbonFootprint = 0.1 * emissions;
        return new EmissionsResponse(emissions, carbonFootprint);
    }

    private double getEmissionFactor(String material) {
        switch (material) {
            case "Steel": return 1.85;
            case "Stainless Steel": return 6.15;
            case "Aluminium": return 11.00;
            case "Copper": return 3.50;
            case "Plastic": return 2.00;
            case "Ceramics": return 0.80;
            case "Glass": return 1.20;
            case "Paper": return 1.30;
            case "Skin": return 17.00;
            default: throw new IllegalArgumentException("Unknown material: " + material);
        }
    }
}