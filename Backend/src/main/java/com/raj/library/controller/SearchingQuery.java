package com.raj.library.controller;

import com.raj.library.Service.SearchQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchingQuery {

    @Autowired
    private SearchQueryService searchQueryService;

    @GetMapping("/books")
    public List<String> searchBook(@RequestParam String query){
        return  searchQueryService.getALlBooksWhereTitleMatched(query);
    }
}
