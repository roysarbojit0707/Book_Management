package com.raj.library.controller;

import com.raj.library.DTO.OTPVerification;
import com.raj.library.Service.MailService;
import com.raj.library.Service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/verify")
public class VerificationController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/verifyOTP")
    public Map<String, Integer> verificationOTP(@RequestBody OTPVerification otpVerification){
        String username = otpVerification.getUsername();
        String otp = otpVerification.getOtp();
        int isVerified = otpService.verifyOTP(username,otp);
        return Map.of("isVerified",isVerified);
    }
}
