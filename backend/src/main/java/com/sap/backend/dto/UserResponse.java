package com.sap.backend.dto;

import com.sap.backend.model.User;

//  DATOS PUBLICOS DEL USUARIO
public record UserResponse(Integer id, String name, String email, String role) {

    public static UserResponse from(User u) {
        String role = u.getRol() != null ? u.getRol().getRolName() : "USER";
        return new UserResponse(u.getId(), u.getName(), u.getEmail(), role);
    }
}
