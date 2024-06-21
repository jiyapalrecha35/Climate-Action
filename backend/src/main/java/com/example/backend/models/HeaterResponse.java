package com.example.backend.models;

public class HeaterResponse {
    private double co2Emissions;

    public HeaterResponse(double co2Emissions) {
        this.co2Emissions = co2Emissions;
    }

    public double getCo2Emissions() {
        return co2Emissions;
    }

    public void setCo2Emissions(double co2Emissions) {
        this.co2Emissions = co2Emissions;
    }
}
