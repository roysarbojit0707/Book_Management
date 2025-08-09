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
public class BookService {

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private SellerService sellerService;

    @Autowired
    private SellerRepository sellerRepository;

    public boolean addBooks(String title,int price,String stocks,String author){
        Book book = new Book();
        book.setAuthor(author);
        book.setTitle(title);
        book.setPrice(price);
        book.setStocks(stocks);
        long sellerId = sellerService.getTempId();
        Optional<Seller> seller = sellerRepository.findById(sellerId);
        Seller mySeller = null;
        if(seller.isPresent()){
            mySeller = seller.get();
        }
        assert mySeller != null;
        book.setUsername(mySeller.getUserName());
        try {
            bookRepo.save(book);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
    public List<Book> getBooks(){
        long sellerId = sellerService.getTempId();
        Optional<Seller> seller = sellerRepository.findById(sellerId);
        Seller mySeller = seller.get();
        List<Book> books = bookRepo.findByUsername(mySeller.getUserName());
        return books;
    }
    public boolean deleteTheBook(Long id){
        try{
            bookRepo.deleteById(id);
            return true;
        }catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
}
