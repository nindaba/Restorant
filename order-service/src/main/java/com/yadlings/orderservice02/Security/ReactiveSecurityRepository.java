package com.yadlings.orderservice02.Security;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
@AllArgsConstructor
@Component
public class ReactiveSecurityRepository implements ServerSecurityContextRepository {

    private ReactiveAuthManager authManager;
    @Override
    public Mono<Void> save(ServerWebExchange serverWebExchange, SecurityContext securityContext) {
        return null;
    }

    @Override
    public Mono<SecurityContext> load(ServerWebExchange serverWebExchange) {
        return Mono
                .justOrEmpty(serverWebExchange
                        .getRequest()
                        .getHeaders()
                        .getFirst(HttpHeaders.AUTHORIZATION)
                    )
                .filter(header -> header.startsWith("bearer "))
                .map(token -> new UsernamePasswordAuthenticationToken(
                        token.substring("bearer ".length()),null))
                .flatMap(authManager::authenticate)
                .map(SecurityContextImpl::new);
    }
}
