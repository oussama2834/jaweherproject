package com.example.ecommerce.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private User user;
    private Role role;

    private static LoginResponse instance;

    public static LoginResponse getInstance(User user,Role role) {
        if (instance == null) {
            instance = new LoginResponse( user,role);
        }
        return instance;
    }
}
