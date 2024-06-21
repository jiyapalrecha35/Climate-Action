package com.example.backend.models;

public class WaterHeaterRequest {
    private double energyConsumption;
    private String usageFrequency;
    private int numberOfHours;
    private String selectedDevice;

    // Getters and setters
    public double getEnergyConsumption() {
        return energyConsumption;
    }

    public void setEnergyConsumption(double energyConsumption) {
        this.energyConsumption = energyConsumption;
    }

    public String getUsageFrequency() {
        return usageFrequency;
    }

    public void setUsageFrequency(String usageFrequency) {
        this.usageFrequency = usageFrequency;
    }

    public int getNumberOfHours() {
        return numberOfHours;
    }

    public void setNumberOfHours(int numberOfHours) {
        this.numberOfHours = numberOfHours;
    }

    public String getSelectedDevice() {
        return selectedDevice;
    }

    public void setSelectedDevice(String selectedDevice) {
        this.selectedDevice = selectedDevice;
    }
}
