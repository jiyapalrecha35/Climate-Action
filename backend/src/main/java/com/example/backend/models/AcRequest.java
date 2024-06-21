package com.example.backend.models;

public class AcRequest {
    private int numberOfUnits;
    private double ratingPerUnit;
    private int numberOfHours;
    private String usageFrequency;
    private String acStatus;
    private int temperatureSetting;
    private String dateOfSaving;
    private String additionalNotes;

    // Getters and setters
    public int getNumberOfUnits() {
        return numberOfUnits;
    }

    public void setNumberOfUnits(int numberOfUnits) {
        this.numberOfUnits = numberOfUnits;
    }

    public double getRatingPerUnit() {
        return ratingPerUnit;
    }

    public void setRatingPerUnit(double ratingPerUnit) {
        this.ratingPerUnit = ratingPerUnit;
    }

    public int getNumberOfHours() {
        return numberOfHours;
    }

    public void setNumberOfHours(int numberOfHours) {
        this.numberOfHours = numberOfHours;
    }

    public String getUsageFrequency() {
        return usageFrequency;
    }

    public void setUsageFrequency(String usageFrequency) {
        this.usageFrequency = usageFrequency;
    }

    public String getAcStatus() {
        return acStatus;
    }

    public void setAcStatus(String acStatus) {
        this.acStatus = acStatus;
    }

    public int getTemperatureSetting() {
        return temperatureSetting;
    }

    public void setTemperatureSetting(int temperatureSetting) {
        this.temperatureSetting = temperatureSetting;
    }

    public String getDateOfSaving() {
        return dateOfSaving;
    }

    public void setDateOfSaving(String dateOfSaving) {
        this.dateOfSaving = dateOfSaving;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }
}
