package com.cognizant.spring_learn;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class SpringLearnApplication {

	private static final Logger logger = LoggerFactory.getLogger(SpringLearnApplication.class);

	public static void main(String[] args) {

		//SpringApplication.run(SpringLearnApplication.class, args);
		//logger.info("Spring Learn Application started.");

		displayCountry();
	}

	private static void displayCountry(){
		logger.info("START: displayCountry()");

		ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

		Country country = (Country)context.getBean("country",Country.class);

		logger.debug("Country : {}", country.toString());

		logger.info("END: displayCountry()");
	}

}
