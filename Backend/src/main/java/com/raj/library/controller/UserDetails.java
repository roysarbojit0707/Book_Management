package com.raj.library.controller;

import com.raj.library.DTO.UserAddress;
import com.raj.library.Service.AddressService;
import com.raj.library.Service.UserService;
import com.raj.library.entity.AddressUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/UserDetails")
public class UserDetails {

    @Autowired
    private UserService userService;

    @Autowired
    private AddressService addressService;

    @GetMapping("/UserID")
    public Long getUserIdByUsername(@RequestParam String username){
        return userService.getUserIdByUsernameService(username);
    }
    @PostMapping("/UserAddressSave")
    public Map<String,Boolean> saveUserAddress(@RequestBody UserAddress userAddress){
        String name = userAddress.getName();
        String phone = userAddress.getPhone();
        String pincode = userAddress.getPincode();
        String locality = userAddress.getLocality();
        String address = userAddress.getAddress();
        String city = userAddress.getCity();
        String state = userAddress.getState();
        String landmark = userAddress.getLandmark();
        String alternatePhone = userAddress.getAlternatePhone();
        String addressType = userAddress.getAddressType();
        String username = userAddress.getUsername();
        Long id = Long.parseLong(userAddress.getId());
        System.out.println(id);
        boolean isAddressSaved = addressService.AddAddressOfUserService(name,phone,pincode,locality,address,city,state,landmark,alternatePhone,addressType,username,id);
        System.out.println(isAddressSaved);
        return Map.of("isAddressSaved",isAddressSaved);
    }
    @GetMapping("/GetUserDetails")
    public List<AddressUser> getUserAddressDetails(@RequestParam String username){
        return addressService.getUserAddressDetailsService(username);
    }
}
