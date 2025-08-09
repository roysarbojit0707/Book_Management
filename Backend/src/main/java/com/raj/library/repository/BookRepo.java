package com.raj.library.repository;

import com.raj.library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepo extends JpaRepository<Book,Long> {
    List<Book> findByUsername(String username);
    List<Book> findByTitle(String title);
}
