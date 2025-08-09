package com.raj.library.DTO;

public class OTPVerification {
    private String username;
    private String otp;

    public OTPVerification() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
