package com.raj.library.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String mail,String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rajmukherjeegcp@gmail.com");
        message.setTo(mail);
        message.setSubject("Your OTP code");
        message.setText("Your otp is: "+otp);
        mailSender.send(message);
        System.out.println("OTP mail send successfully!!!!");
    }
}
