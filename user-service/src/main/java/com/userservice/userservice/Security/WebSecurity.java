package com.userservice.userservice.Security;

import com.userservice.userservice.Models.UserType;
import com.userservice.userservice.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static com.userservice.userservice.Models.Common.SERVICE_END_POINT;

@EnableWebSecurity
@Configuration
public class WebSecurity extends WebSecurityConfigurerAdapter {
    @Value("${token.secret}")
    private String secret;
    @Value("${token.origins}")
    private String origins;
    @Autowired
    private UserService service;
    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(service)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        AuthFilter authFilter = new AuthFilter(secret, authenticationManager());
        authFilter.setFilterProcessesUrl(SERVICE_END_POINT+"/login");
        http.
                csrf().disable()
                .cors().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(SERVICE_END_POINT+"/client",SERVICE_END_POINT+"/login").permitAll()
                .antMatchers(SERVICE_END_POINT+"/employee").hasAuthority(UserType.EMPLOYEE.toString())
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new VerifyFilter(secret), UsernamePasswordAuthenticationFilter.class)
                .addFilter(authFilter);
    }
//    @Bean //Nolonger needed since the gateway has
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(origins.split(",")));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setMaxAge(1000000L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }
}
