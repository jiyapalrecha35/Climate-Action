package com.example.backend.models;

public class TravelResponse {
    private double co2Emissions;
    private double carbonFootprint;

    public TravelResponse(double co2Emissions, double carbonFootprint) {
        this.co2Emissions = co2Emissions;
        this.carbonFootprint = carbonFootprint;
    }

    public double getCo2Emissions() {
        return co2Emissions;
    }

    public void setCo2Emissions(double co2Emissions) {
        this.co2Emissions = co2Emissions;
    }

    public double getCarbonFootprint() {
        return carbonFootprint;
    }

    public void setCarbonFootprint(double carbonFootprint) {
        this.carbonFootprint = carbonFootprint;
    }
}
