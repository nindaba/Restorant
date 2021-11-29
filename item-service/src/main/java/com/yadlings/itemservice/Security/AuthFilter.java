package com.yadlings.itemservice.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
@AllArgsConstructor
public class AuthFilter extends OncePerRequestFilter {
    private String secret;
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        try{
            String token = httpServletRequest
                    .getHeader(HttpHeaders.AUTHORIZATION)
                    .substring("bearer ".length());
            SecurityContextHolder.getContext().setAuthentication(authenticate(token));
        }
        catch (Exception x){
            x.printStackTrace();
            httpServletResponse.sendError(HttpStatus.FORBIDDEN.value());
        }
        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }
    public Authentication authenticate(String token) throws Exception {
        Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT verified = verifier.verify(token);
        Map<String, Object> payload = verified.getClaim("payload").asMap();
        return new UsernamePasswordAuthenticationToken(
                payload.get("userId"),
                null,
                AuthorityUtils.createAuthorityList((String) payload.get("userType")));
    }
}
