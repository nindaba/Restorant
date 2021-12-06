package com.yadlings.orderservice02.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Verification;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
@Component
@AllArgsConstructor
@NoArgsConstructor
@Log4j2
public class ReactiveAuthManager implements ReactiveAuthenticationManager {
    @Value("${token.secret}")
    private String secret;
    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        return Mono
                .justOrEmpty(secret)
                .map(Algorithm::HMAC256)
                .map(JWT::require)
                .map(Verification::build)
                .map(verifier -> verifier.verify((String) authentication.getPrincipal()))
                .map(verified -> verified.getClaim("payload").asMap())
                .map(payload -> new UsernamePasswordAuthenticationToken(
                        (String) payload.get("userId"),
                        null,
                        AuthorityUtils.createAuthorityList((String) payload.get("userType"))));
    }
}

