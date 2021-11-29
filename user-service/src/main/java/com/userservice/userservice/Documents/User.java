package com.userservice.userservice.Documents;

import com.userservice.userservice.Models.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class User implements UserDetails{
    @Id
    private String userId;
    //todo add hibernate verifier for wanted fields
    private String username;
    private String name;
    private String email;
    private String password;
    private UserType type;
    //todo add email code for activation
    private Boolean  accountLocked = true;


    @Override
    public List<GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(type.toString());
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {return accountLocked;}
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
