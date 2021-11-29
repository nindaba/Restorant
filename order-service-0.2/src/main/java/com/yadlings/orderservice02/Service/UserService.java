package com.yadlings.orderservice02.Service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

public class UserService {
    /**
     * Gets the login userId from the reactive security context holder
     * @return Mono of String
     */
    public static Mono<String> authorizedUserId(){
        return ReactiveSecurityContextHolder
                .getContext()
                .map(SecurityContext::getAuthentication)
                .map(Authentication::getPrincipal)
                .map(Object::toString);
    }
}
