package com.cognizant.spring_learn_jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringLearnJwtApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnJwtApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(SpringLearnJwtApplication.class, args);
		LOGGER.info("Spring Learn JWT Application started.");
	}
}