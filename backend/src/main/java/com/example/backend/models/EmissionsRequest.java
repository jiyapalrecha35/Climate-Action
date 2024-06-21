package com.example.backend.models;

public class EmissionsRequest {
    private String material;
    private double quantity;


    public EmissionsRequest() {}

    public EmissionsRequest(String material, double quantity) {
        this.material = material;
        this.quantity = quantity;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
}
