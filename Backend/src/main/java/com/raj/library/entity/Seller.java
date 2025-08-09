package com.raj.library.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="seller")
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String password;
    private String name;
    private String phoneNumber;
    private String emailId;

    public Seller(){

    }

    public Seller(String emailId, String phoneNumber, String name, String password, String userName, Long id) {
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.password = password;
        this.userName = userName;
        this.id = id;
    }

//    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<SellerBook> sellerBooks = new ArrayList<>();

//    public List<SellerBook> getSellerBooks() {
//        return sellerBooks;
//    }
//
//    public void setSellerBooks(List<SellerBook> sellerBooks) {
//        this.sellerBooks = sellerBooks;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
}
