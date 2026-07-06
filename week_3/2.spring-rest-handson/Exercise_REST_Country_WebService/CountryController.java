package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    private final ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

    @RequestMapping(value="/country" , method = RequestMethod.GET)
    public Country getCountryIndia(){
        LOGGER.info("START: getCountryIndia()");

        Country country = (Country) context.getBean("country", Country.class);

        LOGGER.debug("Country returned: {}", country.toString());
        LOGGER.info("END: getCountryIndia()");

        return country;
    }
}
