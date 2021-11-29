package com.userservice.userservice.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@AllArgsConstructor
@Log4j2
public class VerifyFilter extends OncePerRequestFilter {
    private String secret;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!request.getServletPath().matches("/user/login") &&
                !request.getServletPath().matches("/user/register-client")) {
            try {
                String token = request.getHeader("token")
                        .substring("bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256(secret);
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(token);
                Map<String, Object> claims = decodedJWT.getClaim("payload").asMap();
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(claims.get("username"),
                        null,
                        AuthorityUtils.createAuthorityList((String) claims.get("userType")));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } catch (Exception exception) {
                response.sendError(1, "Invalid Token");
                exception.printStackTrace();
            }
        }
//        response.setHeader("Access-Control-Allow-Origin","http://localhost:4200");
        filterChain.doFilter(request,response);
    }
}
