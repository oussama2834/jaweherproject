package com.example.ecommerce.services;
import com.example.ecommerce.entities.JwtRequest;
import com.example.ecommerce.entities.JwtResponse;
import com.example.ecommerce.entities.User;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    UserRepository userDao;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;


    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
        String userName = jwtRequest.getUserName();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(jwtRequest.getUserName(),
                            jwtRequest.getUserPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid username or password.", e);
        }

        final UserDetails userDetails = loadUserByUsername(userName);

        final String accessToken = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken();
        User user = userDao.findByUsername(jwtRequest.getUserName());
        userDao.save(user);

        JwtResponse jwtResponse = new JwtResponse(user, accessToken, refreshToken);
        return jwtResponse;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getMotDePasse(),
                    getAuthorities(user)
            );

        } else {
            throw new UsernameNotFoundException("Username is not valid");
        }
    }

    private Set getAuthorities(User user) {
        Set authorities = new HashSet();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRole()));
        });
        return authorities;
    }





}
