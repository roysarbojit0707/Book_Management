package com.raj.library.controller;

import com.raj.library.DTO.SellerContact;
import com.raj.library.Service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/mailSenderSeller")
public class SellerController {

    @Autowired
    private MailService mailService;

    @PostMapping("/sendMailSeller")
    public Map<String,Boolean> sendMailToSeller(@RequestBody SellerContact sellerContact){
        String username = sellerContact.getUsername();
        String email = sellerContact.getEmail();
        String message = sellerContact.getMessage();
        String recipient = sellerContact.getSellerEmail();
        boolean isContactMailSend = mailService.sendMailToContact(recipient,username,email,"NULL",message);
        return Map.of("isContactMailSend",isContactMailSend);
    }
}
