package com.yadlings.orderservice02.Security;

import com.yadlings.orderservice02.Models.UserType;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;

import java.util.Arrays;
@EnableWebFluxSecurity
public class WebSecurity{
    private ReactiveAuthManager reactiveAuthManager;
    private ReactiveSecurityRepository reactiveSecurityRepository;
	public WebSecurity(ReactiveAuthManager reactiveAuthManager,ReactiveSecurityRepository reactiveSecurityRepository){
		this.reactiveAuthManager = reactiveAuthManager;
		this.reactiveSecurityRepository = reactiveSecurityRepository;
	}
    @Value("${allowed.origins}")
    private String origins;
    @Bean
    public SecurityWebFilterChain webFilterChain(ServerHttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .formLogin().disable()
                .httpBasic().disable()
                .csrf().disable()
                .cors().disable()
//                .and()
                /**
                 * Authentication manager is customized to fit the jwt token model of authentication
                 * Security Repository is customized to intercept the request and get the token,
                 * in order to send to the auth manager and ReactiveSecurityContextHolder
                 */
                .authenticationManager(reactiveAuthManager)
                .securityContextRepository(reactiveSecurityRepository)
                .authorizeExchange()
                /**
                 * Both Client and Employee have to be Authenticated for many reasons
                 * Against pretenders to be them
                 * and for the service to keep their Ids and use them on their requests
                 */
                .pathMatchers(HttpMethod.GET,"/order").hasAuthority(UserType.CLIENT.toString())
                .pathMatchers(HttpMethod.GET,"/order/*").hasAuthority(UserType.EMPLOYEE.toString())
                .pathMatchers(HttpMethod.PUT,"/order").hasAuthority(UserType.EMPLOYEE.toString())
                .pathMatchers(HttpMethod.POST,"/order").hasAuthority(UserType.CLIENT.toString())
                .anyExchange().authenticated()
                .and()
                /**
                 * Filter for getting the authenticated user and set the id in the header
                 */
                .addFilterAfter(new AuthorizedIdSetter(), SecurityWebFiltersOrder.AUTHENTICATION)
                .build();
    }
//    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setMaxAge(100000L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
