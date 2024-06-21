package com.example.backend.models;

public class EmissionsResponse {
    private double emissions;
    private double carbonFootprint;

    public EmissionsResponse() {}

    public EmissionsResponse(double emissions, double carbonFootprint) {
        this.emissions = emissions;
        this.carbonFootprint = carbonFootprint;
    }

    public double getEmissions() {
        return emissions;
    }

    public void setEmissions(double emissions) {
        this.emissions = emissions;
    }

    public double getCarbonFootprint() {
        return carbonFootprint;
    }

    public void setCarbonFootprint(double carbonFootprint) {
        this.carbonFootprint = carbonFootprint;
    }
}
