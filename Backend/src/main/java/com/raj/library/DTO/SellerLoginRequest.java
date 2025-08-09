package com.raj.library.DTO;

public class SellerLoginRequest {
    private String userName;
    private String password;

    public SellerLoginRequest() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String username) {
        this.userName = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
