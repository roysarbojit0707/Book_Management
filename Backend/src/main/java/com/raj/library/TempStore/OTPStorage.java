package com.raj.library.TempStore;

import java.util.HashMap;
import java.util.Map;

public class OTPStorage {
    private static final Map<String,String> otpStore = new HashMap<>();
    public static void storeOtp(String mail,String otp){
        otpStore.put(mail,otp);
    }
    public static boolean verifyOTP(String mail,String otp){
        return otpStore.containsKey(mail) && otpStore.get(mail).equals(otp);
    }
}
