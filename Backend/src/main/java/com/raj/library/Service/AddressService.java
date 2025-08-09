package com.raj.library.Service;

import com.raj.library.entity.AddressUser;
import com.raj.library.repository.UserAddressRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private UserAddressRepo userAddressRepo;

    @Transactional
    public boolean AddAddressOfUserService(String name,String phone,String pincode,String locality,String address,String city,String state,String landmark,String alternatePhone,String addressType,String username,Long id){
        try{
            AddressUser addressUser = new AddressUser();
            addressUser.setName(name);
            addressUser.setPhone(phone);
            addressUser.setPincode(pincode);
            addressUser.setLocality(locality);
            addressUser.setAddress(address);
            addressUser.setCity(city);
            addressUser.setState(state);
            addressUser.setLandmark(landmark);
            addressUser.setAlternatePhone(alternatePhone);
            addressUser.setAddressType(addressType);
            addressUser.setUsername(username);
            addressUser.setId(id);
            System.out.println(addressUser);
            userAddressRepo.save(addressUser);
            userAddressRepo.flush();
            return true;
        }catch(Exception e){
            System.out.println(e.getMessage());
            return  false;
        }

    }
    public List<AddressUser> getUserAddressDetailsService(String username){
        return userAddressRepo.findByUsername(username);
    }
}
