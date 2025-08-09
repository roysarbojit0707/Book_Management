package com.raj.library.Service;

import com.raj.library.entity.Book;
import com.raj.library.entity.Seller;
import com.raj.library.repository.BookRepo;
import com.raj.library.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookSellersService {

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private SellerRepository sellerRepository;

    public List<Book> getAllBooksMatchedWithTitle(String title){
        return bookRepo.findByTitle(title);
    }

    public Book getBookWhereIdMatched(Long id){
        Optional<Book> book = bookRepo.findById(id);
        return book.get();
    }

    public Seller getSellerNameByUsername(String userName){
        return sellerRepository.findByUserName(userName);
    }
}
