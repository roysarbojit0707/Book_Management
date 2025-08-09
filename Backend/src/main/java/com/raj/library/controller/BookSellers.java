package com.raj.library.controller;

import com.raj.library.Service.BookSellersService;
import com.raj.library.entity.Book;
import com.raj.library.entity.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fetchSellers")
public class BookSellers {

    @Autowired
    private BookSellersService bookSellersService;

    @GetMapping("/books")
    public List<Book> getAllBook(@RequestParam String title){
        return bookSellersService.getAllBooksMatchedWithTitle(title);
    }
    @GetMapping("/idMatched")
    public Book getBookIdMatched(@RequestParam String id){
        Long bookId = Long.parseLong(id);
        System.out.println(bookId);
        return bookSellersService.getBookWhereIdMatched(bookId);
    }
    @GetMapping("/getSellerName")
    public Seller SellerName(@RequestParam String userName){
        System.out.println(userName);
        Seller seller = bookSellersService.getSellerNameByUsername(userName);
        System.out.println(seller);
        return seller;
    }
}
