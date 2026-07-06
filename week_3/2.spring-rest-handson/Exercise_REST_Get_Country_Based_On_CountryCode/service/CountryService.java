package com.cognizant.spring_learn.service;

import com.cognizant.spring_learn.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;
import java.util.List;
import jakarta.annotation.PostConstruct;

@Service
public class CountryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryService.class);
    private List<Country> countries;

    @PostConstruct
    public void init() {
        LOGGER.info("Inside CountryService init() method - START");
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        this.countries = (List<Country>) context.getBean("countryList");
        LOGGER.debug("Countries loaded: {}", countries);
        ((ClassPathXmlApplicationContext) context).close();
        LOGGER.info("Inside CountryService init() method - END");
    }

    public Country getCountry(String code) {
        LOGGER.info("START: getCountry(code={})", code);

        Country foundCountry = countries.stream()
                .filter(country -> country.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);

        LOGGER.info("END: getCountry()");
        return foundCountry;
    }
}