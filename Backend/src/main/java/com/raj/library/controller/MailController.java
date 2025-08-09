package com.raj.library.controller;

import com.raj.library.DTO.ContactHolder;
import com.raj.library.DTO.OtpSender;
import com.raj.library.Service.MailService;
import com.raj.library.Service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private MailService mailService;
    @PostMapping("/contact")
    public Map<String, Boolean> sendMail(@RequestBody ContactHolder contactHolder){
        String username = contactHolder.getUsername();
        String email = contactHolder.getEmail();
        String mobile = contactHolder.getTel();
        String message = contactHolder.getMessage();
        System.out.println("username "+username+" email "+email+" mobile "+mobile+" message "+message);
        boolean isContactMailSend = mailService.sendMailToContact("",username,email,mobile,message);
        return Map.of("isContactMailSend",isContactMailSend);
    }

    @Autowired
    private OtpService otpService;

    @PostMapping("/sendOtp")
    public Map<String, Boolean> sendOTP(@RequestBody OtpSender otpSender){
        String username = otpSender.getUsername();
        String email = otpSender.getEmail();
        boolean isOTPGenerated = otpService.generateOTP(username);
        boolean isMailSend = false;
        if(isOTPGenerated){
            isMailSend = otpService.sendOTPToEmail(username,email);
        }
        return Map.of("isMailSend",isMailSend);
    }
}
