package com.raj.library.DTO;

public class BookAdd {
    private String title;
    private String price;
    private String author;
    private String stocks;

    public BookAdd() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String  getPrice() {
        return price;
    }

    public void setPrice(String  price) {
        this.price = price;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getStocks() {
        return stocks;
    }

    public void setStocks(String stocks) {
        this.stocks = stocks;
    }
}
