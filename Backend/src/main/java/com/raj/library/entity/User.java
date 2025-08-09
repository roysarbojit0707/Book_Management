package com.raj.library.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Student")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;
    private int age;
    private int dueBooks;
    private int assignedBooks;
    private String phoneNumber;
    private String emailId;
    private String gender;
    public User(){

    }
    public User(String username, String password, String name, int age, int dueBooks, int assignedBooks, String phoneNumber, String emailId, String gender) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.age = age;
//        this.id = id;
        this.dueBooks = dueBooks;
        this.assignedBooks = assignedBooks;
        this.phoneNumber = phoneNumber;
        this.emailId = emailId;
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public long getId() {
        return id;
    }

    public int getDueBooks() {
        return dueBooks;
    }

    public void setDueBooks(int dueBooks) {
        this.dueBooks = dueBooks;
    }

    public int getAssignedBooks() {
        return assignedBooks;
    }

    public void setAssignedBooks(int assignedBooks) {
        this.assignedBooks = assignedBooks;
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
