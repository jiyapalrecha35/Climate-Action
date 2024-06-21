package com.example.backend.models;

public class WaterHeaterResponse {
    private double co2Emitted;

    public WaterHeaterResponse(double co2Emitted) {
        this.co2Emitted = co2Emitted;
    }

    public double getCo2Emitted() {
        return co2Emitted;
    }

    public void setCo2Emitted(double co2Emitted) {
        this.co2Emitted = co2Emitted;
    }
}
