package com.userservice.userservice.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.userservice.userservice.Documents.User;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@AllArgsConstructor
@Log4j2
public class AuthFilter extends UsernamePasswordAuthenticationFilter {
    private String secret;
    private AuthenticationManager manager;
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        return manager.authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        Date dateGranted = new Date();
        Date dateExpires = new Date();
        dateExpires.setHours(dateExpires.getHours() + 168); //Todo this needs to be fixed as it is giving range of 7 days in stead of two
        User user = (User) authResult.getPrincipal();
        Map<String, ?> claims = Map.of(
                "userId", user.getUserId(),
                "email", user.getEmail(),
                "userType", user.getType().toString()
        );
        String token = JWT.create()
                .withExpiresAt(dateExpires)
                .withIssuedAt(dateGranted)
                .withIssuer("Yadlings")
                .withSubject(user.getUsername())
                .withClaim("payload", claims)
                .sign(algorithm);
        response.setContentType(MediaType.APPLICATION_JSON.toString());
        response.setHeader(HttpHeaders.AUTHORIZATION, "bearer " + token);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
    }
}
