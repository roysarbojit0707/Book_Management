package com.raj.library.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.*;

@Service
public class OtpService {
    private static final int otpLength = 6;
    private Map<String,String> otpMapping = new HashMap<>();
    public boolean generateOTP(String username){
        String generatedOTP = "";
        for(int i=1;i<=otpLength;i++){
            generatedOTP += String.valueOf((int)(Math.random()*9)+1);
        }
        otpMapping.put(username,generatedOTP);
        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
        scheduledExecutorService.schedule(()->otpMapping.remove(username),2, TimeUnit.MINUTES);
//       the ScheduledExecutorService is a java utility that used to schedule the task. It basically schedule any task execute after a define time stamp you can decide the time stamp here I decide minutes. It is better than Treade.sleep() method because it doesnot block the main tread. Executors.newScheduledThreadPool(1) means it create a thread pool with 1 background thread to handle the schedule task.
        return true;
    }

    @Autowired
    private JavaMailSender javaMailSender;
    public boolean sendOTPToEmail(String username,String email){
        try{
            String otp = otpMapping.get(username);
            System.out.println(otp);
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage,true);

            messageHelper.setFrom("rajmukherjeegcp@gmail.com");
            messageHelper.setTo(email);
            messageHelper.setSubject("OTP for our Verification: TEAM LIBRARY");
            messageHelper.setText(
                    "<html><div>" +
                            "<h1 style='font-size:24px;'>Welcome to The Librarian, " + username + "!</h1>" +
                            "<p style='font-size:20px;'>Your OTP is: <strong>" + otp + "</strong></p>" +
                            "<p style='font-size:16px; color:red; display: inline-block;'><strong>Security Notice:</strong></p>" +
                            "<ul style='font-size:14px; color:#555;'>" +
                            "<li>Never share your OTP with anyone, including Librarian staff.</li>" +
                            "<li>The OTP is valid for a limited time and can only be used once.</li>" +
                            "<li>If you did not request this OTP, please ignore this email.</li>" +
                            "</ul>" +
                            "</div></html>",
                    true
            );
            javaMailSender.send(mimeMessage);
            return true;
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
    public int verifyOTP(String username,String otp){
        if(otpMapping.containsKey(username)){
            if(otpMapping.get(username).equals(otp)){
                otpMapping.remove(username);
                return 2;
            }else{
                return 1;
            }
        }else{
            return 0;
        }
    }
}
