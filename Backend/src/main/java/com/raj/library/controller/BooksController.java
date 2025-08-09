package com.raj.library.controller;

import com.raj.library.DTO.BookAdd;
import com.raj.library.DTO.BookDelete;
import com.raj.library.Service.BookService;
import com.raj.library.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/books")
public class BooksController {

    @Autowired
    private BookService bookService;

    @PostMapping("/addBooks")
    public Map<String,Boolean> addNewBook(@RequestBody BookAdd bookAdd){
        String title = bookAdd.getTitle().trim();
        int price = Integer.parseInt(bookAdd.getPrice());
        String stocks = bookAdd.getStocks().trim();
        String author = bookAdd.getAuthor().trim();
        boolean isAdded =  bookService.addBooks(title,price,stocks,author);
        return Map.of("isAdded", isAdded);
    }
    @GetMapping("/getAllBooks")
    public List<Book> getAllBooks(){
        List<Book> allBooks = bookService.getBooks();
        System.out.println(allBooks);
        return allBooks;
    }

    @DeleteMapping("/deleteBook")
    public Map<String, Boolean> deleteBooks(@RequestBody BookDelete bookDelete){
        Long id = bookDelete.getId();
        System.out.println(id + " "+ bookDelete.getId());
        boolean isDeleted = bookService.deleteTheBook(id);
        return Map.of("isDeleted",isDeleted);
    }
}
