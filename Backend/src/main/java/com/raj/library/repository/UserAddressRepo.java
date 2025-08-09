package com.raj.library.repository;

import com.raj.library.entity.AddressUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAddressRepo extends JpaRepository<AddressUser,Long> {
    List<AddressUser> findByUsername(String username);
}
