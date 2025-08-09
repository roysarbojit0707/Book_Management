package com.raj.library.controller;

import com.raj.library.DTO.LibraryAddingDTO;
import com.raj.library.DTO.UserLibrary;
import com.raj.library.Service.LibraryService;
import com.raj.library.entity.Library;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/library")
public class LibraryController {
    @Autowired
    private LibraryService libraryService;
    @PostMapping("/addLibrary")
    public Map<String,Boolean> addLibrary(@RequestBody LibraryAddingDTO libraryAddingDTO){
        String name = libraryAddingDTO.getName();
        String libraryMailId = libraryAddingDTO.getLibraryMailId();
        double latitude = Double.parseDouble(libraryAddingDTO.getLatitude());
        double longitude = Double.parseDouble(libraryAddingDTO.getLongitude());
        String websiteLink = libraryAddingDTO.getWebsiteLink();
        String openingTime = libraryAddingDTO.getOpeningTime();
        String closingTime = libraryAddingDTO.getClosingTime();
        String openDays = libraryAddingDTO.getOpenDays();
        String ph = libraryAddingDTO.getLibraryMailId();
        String username = libraryAddingDTO.getUsername();
        Library library = new Library(libraryMailId,latitude,longitude,websiteLink,openingTime,closingTime,openDays,ph,username,name);
        boolean isAdded = libraryService.addLibrary(library);
        return Map.of("isAdded",isAdded);
    }
    @GetMapping("/getLirary")
    public List<Library> getAllBooks(@RequestParam String username){
        return libraryService.getLibraryService(username);
    }
    @GetMapping("/nearby")
    public List<Library> getNearbyLibraries(){
        return  libraryService.getNearbyLibrariesController();
//        return libraryService.sortedMaps(libraryList);
    }
}
