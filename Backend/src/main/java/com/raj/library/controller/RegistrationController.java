package com.raj.library.controller;


import com.raj.library.DTO.RegisterSeller;
import com.raj.library.DTO.RegisterUser;
import com.raj.library.Service.SellerService;
import com.raj.library.Service.UserService;
import com.raj.library.entity.User;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/registration")
public class RegistrationController {

    @Autowired
    private SellerService sellerService;


    @PostMapping("/addSeller")
    public Map<String,Boolean> addSeller(@RequestBody RegisterSeller registerSeller){
        String userName = registerSeller.getUserName();
        String password = registerSeller.getPassword();
        String name = registerSeller.getName();
        String phoneNumber = registerSeller.getPhoneNumber();
        String emailId = registerSeller.getEmailId();
        boolean isRegisterSeller = sellerService.registerSellerService(userName,password,name,phoneNumber,emailId);
        return Map.of("isRegisterSeller",isRegisterSeller);
    }
//    @Autowired
//    private AdminService adminService;
//
//    @PostMapping("/addAdmin")
//    public String  addAdmin(@ModelAttribute Seller admin){
//        adminService.addAdmin(admin);
//        return "SuccessAdmin";
//    }
//    @GetMapping("/add-Seller")
//    public String getMethodForAddAdmin(Model model){
//        model.addAttribute("admin",new Seller());
//        return "addAdmin";
//    }

    @Autowired
    private UserService userService;

    @GetMapping("/add-User")
    public String addUser(Model model){
        model.addAttribute("user",new User());
        return "addUser";
    }

    @PostMapping("/addUser")
    public Map<String,Boolean> postUser(@RequestBody RegisterUser registerUser){
        String username = registerUser.getUsername();
        String password = registerUser.getPassword();
        String name = registerUser.getName();
        int age = Integer.parseInt(registerUser.getAge());
        String phoneNumber = registerUser.getPhoneNumber();
        String emailId = registerUser.getEmailId();
        String gender = registerUser.getGender();
        boolean isRegister = userService.addUser(username,password,name,age,phoneNumber,emailId,gender);
        return Map.of("register", isRegister);
    }
}
