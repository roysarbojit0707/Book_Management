package com.raj.library.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Librarian")
public class Librarian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String librarian;
    private String ph;
    private String mailId;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imageData;

    public Librarian() {
    }

    public Librarian(String username, String password, String librarian, String ph, String mailId, byte[] imageData) {
        this.username = username;
        this.password = password;
        this.librarian = librarian;
        this.ph = ph;
        this.mailId = mailId;
        this.imageData = imageData;
    }

    public Librarian(String username, String password, String ph, String mailId) {
        this.username = username;
        this.password = password;
        this.ph = ph;
        this.mailId = mailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLibrarian() {
        return librarian;
    }

    public void setLibrarian(String librarian) {
        this.librarian = librarian;
    }

    public String getPh() {
        return ph;
    }

    public void setPh(String ph) {
        this.ph = ph;
    }

    public String getMailId() {
        return mailId;
    }

    public void setMailId(String mailId) {
        this.mailId = mailId;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}
