package com.yadlings.itemservice.Security;

import com.yadlings.itemservice.Models.UserType;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.lang.reflect.Method;
import java.util.Arrays;

@Configuration
public class WebSecurity extends WebSecurityConfigurerAdapter {
    @Value("${token.secret}")
    private String secret;
    @Value("${allowed.origins}")
    private String origins;	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                 .authorizeRequests()
                 .antMatchers(HttpMethod.GET,"/*").permitAll()
                 .antMatchers(HttpMethod.PUT,"/*").hasAnyAuthority(UserType.EMPLOYEE.toString())
                 .antMatchers(HttpMethod.POST,"/*").hasAnyAuthority(UserType.EMPLOYEE.toString())
                 .antMatchers(HttpMethod.DELETE,"/*").hasAnyAuthority(UserType.EMPLOYEE.toString())
                .anyRequest().permitAll()
                .and()
                .addFilterBefore(new AuthFilter(secret), UsernamePasswordAuthenticationFilter.class);
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
//todo to be configured and try adding the gateway only
//todo use the origins variable from the properties file
        corsConfiguration.setAllowedOrigins(Arrays.asList(origins));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("*"));
        corsConfiguration.setMaxAge(172800L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);
        return source;
    }

}
