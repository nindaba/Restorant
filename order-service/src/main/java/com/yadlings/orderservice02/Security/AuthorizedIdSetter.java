package com.yadlings.orderservice02.Security;

import com.yadlings.orderservice02.Models.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
@Log4j2
public class AuthorizedIdSetter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        return ReactiveSecurityContextHolder
                .getContext()
                .map(SecurityContext::getAuthentication)
                .map(Authentication::getPrincipal)
                .map(Object::toString)
                .map(userId -> exchange
                        .getRequest()
                        .mutate()
                        .header(Constants.AUTHORISED_USER_ID, userId)
                        .build())
                .map(request -> exchange
                        .mutate()
                        .request(request)
                        .build())
                .flatMap(chain::filter);
//        return null;
    }
}
