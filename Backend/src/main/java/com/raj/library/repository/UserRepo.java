package com.raj.library.repository;

import com.raj.library.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Long > {
    User findByUsernameAndPassword(String username, String password);
    User findByUsername(String username);
}
