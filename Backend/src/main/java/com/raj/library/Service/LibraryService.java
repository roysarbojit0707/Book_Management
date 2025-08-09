package com.raj.library.Service;

import com.raj.library.DTO.UserLibrary;
import com.raj.library.entity.Library;
import com.raj.library.repository.LibraryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {
    private static final double EARTH_RADIUS = 6371;
    @Autowired
    private LibraryRepo libraryRepo;
    public boolean addLibrary(Library library){
        try{
            library.setAvgRating(3.0F);
            libraryRepo.save(library);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
    public List<Library> getLibraryService(String username){
        List<Library> libraryList = new ArrayList<>();
        try{
            libraryList = libraryRepo.findByUsername(username);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return libraryList;
    }
    public List<Library> getNearbyLibrariesController(){
        List<Library> listOfLibrary = libraryRepo.findAll();
//        return listOfLibrary.stream()
//                .filter(library -> calculateDistance(lat,lng,library.getLatitude(),library.getLongitude())<=5)
//                .toList();
        return listOfLibrary;
    }
    public double calculateDistance(double lat1,double lng1,double lat2,double lng2){
        double dLat = Math.toRadians(lat2-lat1);
        double dLng = Math.toRadians(lng2-lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }
    public List<UserLibrary> sortedMaps(List<Library> libraryList){
        List<UserLibrary> sortedList = new ArrayList<>();
        for(int i=0;i<libraryList.size();i++){
            String name = libraryList.get(i).getName();
            float avgRating = libraryList.get(i).getAvgRating();
            String libraryMailId = libraryList.get(i).getLibraryMailId();
            double latitude = libraryList.get(i).getLatitude();
            double longitude = libraryList.get(i).getLongitude();
            String websiteLink = libraryList.get(i).getWebsiteLink();
            String openingTime = libraryList.get(i).getOpeningTime();
            String closingTime = libraryList.get(i).getClosingTime();
            String openDays = libraryList.get(i).getOpenDays();
            String ph = libraryList.get(i).getPh();
            UserLibrary userLibrary = new UserLibrary(name,avgRating,libraryMailId,latitude,longitude,websiteLink,openingTime,closingTime,openDays,ph);
            sortedList.add(userLibrary);
        }
        return sortedList;
    }
}
