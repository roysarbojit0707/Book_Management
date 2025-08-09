package com.raj.library.controller;

import com.raj.library.Service.UserService;
import com.raj.library.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Profile")
public class Profile {

    @Autowired
    private UserService userService;
//
//    @GetMapping("/Me")
//    public String getUser(Model model){
//        model.addAttribute("details",userService.getUser());
//        return "Me";
//    }
//    @GetMapping("/Edit")
//    public String EditUser(Model model){
//        model.addAttribute("Delete",new User());
//        return "Edit";
//    }
//    @PostMapping("/deleteAccount")
//    public String editProfile(@ModelAttribute User user){
//        if(userService.checkUserName(user)){
//            System.out.println(user.getUsername());
//            if (userService.checkPassword(user)){
//                System.out.println(user.getPassword());
//                if(userService.deleteUser(user)){
//                    return "DeleteSuccessfully";
//                }else{
//                    return "NotSuccess";
//                }
//            }else{
//                return "wrongPasswordUser";
//            }
//        }else{
//            return "noUser";
//        }
//    }

}
