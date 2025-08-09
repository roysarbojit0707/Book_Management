package com.raj.library.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="UserAddress")
public class AddressUser {
    @Id
    private Long id;
    private String pincode;
    private String name;
    private String phone;
    private String locality;
    private String address;
    private String city;
    private String state;
    private String landmark;
    private String alternatePhone;
    private String addressType;
    private String username;

    public AddressUser() {
    }

    public AddressUser(Long id, String pincode, String name, String phone, String locality, String address, String city, String state, String landmark, String alternatePhone, String addressType, String username) {
        this.id = id;
        this.pincode = pincode;
        this.name = name;
        this.phone = phone;
        this.locality = locality;
        this.address = address;
        this.city = city;
        this.state = state;
        this.landmark = landmark;
        this.alternatePhone = alternatePhone;
        this.addressType = addressType;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocality() {
        return locality;
    }

    public void setLocality(String locality) {
        this.locality = locality;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getAlternatePhone() {
        return alternatePhone;
    }

    public void setAlternatePhone(String alternatePhone) {
        this.alternatePhone = alternatePhone;
    }

    public String getAddressType() {
        return addressType;
    }

    public void setAddressType(String addressType) {
        this.addressType = addressType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
