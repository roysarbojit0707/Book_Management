package com.raj.library.repository;

import com.raj.library.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibraryRepo extends JpaRepository<Library,Long> {
    List<Library> findByUsername(String username);
}
