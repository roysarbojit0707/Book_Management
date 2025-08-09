package com.raj.library.Service;

import com.raj.library.entity.User;
import com.raj.library.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public boolean addUser(String username,String password,String name,int age,String phoneNumber,String emailId,String gender){
        try {
            System.out.println(username);
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setName(name);
            user.setAge(age);
            user.setPhoneNumber(phoneNumber);
            user.setEmailId(emailId);
            user.setGender(gender);
            userRepo.save(user);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
    public boolean userCheckerService(String username, String password){
        try {
            System.out.println(username);
            User temp = userRepo.findByUsernameAndPassword(username,password);
            System.out.println(temp);
            if(temp!=null){
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }
    public boolean deleteUser(User user){
        try {
            userRepo.delete(user);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    public Long getUserIdByUsernameService(String username){
        User user = userRepo.findByUsername(username);
        long a =  user.getId();
        System.out.println(a);
        return a;
    }
}
