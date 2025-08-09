package com.raj.library.repository;

import com.raj.library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchingRepo extends JpaRepository<Book,Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
}
