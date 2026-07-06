package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.Country;
import com.cognizant.spring_learn.service.CountryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    @Autowired
    private CountryService countryService;

    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable("code") String code) {
        LOGGER.info("START: getCountry(code={})", code);

        Country country = countryService.getCountry(code);

        if (country == null) {
            LOGGER.error("Country with code {} not found, throwing 404.", code);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Country not found with code: " + code);
        }

        LOGGER.info("END: getCountry() - returning {}", country.toString());
        return country;
    }
}