package com.example.ecommerce.entities;

public enum ERole {
    ADMIN,
    CLIENT;

    public static ERole fromString(String roleName) {
        try {
            return ERole.valueOf(roleName.toUpperCase());
        } catch (IllegalArgumentException ex) {

            ERole newRole = ERole.valueOf(roleName.toUpperCase());

            return newRole;
        }
    }
}
