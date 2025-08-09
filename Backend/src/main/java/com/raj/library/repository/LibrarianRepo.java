package com.raj.library.repository;

import com.raj.library.entity.Librarian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrarianRepo extends JpaRepository<Librarian,Long> {
    boolean existsByUsername(String username);
    boolean existsByPassword(String password);
}
