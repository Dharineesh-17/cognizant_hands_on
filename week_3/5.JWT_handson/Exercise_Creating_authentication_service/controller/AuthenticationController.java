package com.cognizant.spring_learn_jwt.controller;

import com.cognizant.spring_learn_jwt.util.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public ResponseEntity<Map<String, String>> authenticate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        LOGGER.info("START: authenticate()");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Basic ")) {
            LOGGER.warn("Invalid or missing Authorization header.");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String base64Credentials = authorizationHeader.substring("Basic ".length()).trim();
        byte[] decodedCredentials = Base64.getDecoder().decode(base64Credentials);
        String credentials = new String(decodedCredentials, StandardCharsets.UTF_8);

        String[] parts = credentials.split(":", 2);
        if (parts.length != 2) {
            LOGGER.warn("Invalid Basic token format.");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String username = parts[0];
        String password = parts[1];

        try {
            LOGGER.debug("Attempting to authenticate user: {}", username);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            LOGGER.debug("Authentication successful for user: {}", username);

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            String token = jwtTokenUtil.generateToken(userDetails);

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            LOGGER.info("END: authenticate() - Token generated for user: {}", username);
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            LOGGER.error("Invalid credentials provided for user: {}", username);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            LOGGER.error("An unexpected error occurred during authentication for user: {}. Error: {}", username, e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}