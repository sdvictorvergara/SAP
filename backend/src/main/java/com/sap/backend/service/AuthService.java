package com.sap.backend.service;

import com.sap.backend.dto.LoginRequest;
import com.sap.backend.dto.UserResponse;
import com.sap.backend.model.User;
import com.sap.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

//  AUTENTIFICADOR DE USUARIO/EMAIL Y CONTRASEÑA
@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordService passwordService;

    public AuthService(UserRepository users, PasswordService passwordService) {
        this.users = users;
        this.passwordService = passwordService;
    }

    @Transactional(readOnly = true)
    public UserResponse login(LoginRequest request) {
        if (request.username() == null || request.password() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario y la contraseña son obligatorios");
        }

        User user = users.findByEmail(request.username())
                .or(() -> users.findByName(request.username()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario o contraseña incorrectos"));

        if (!passwordService.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario o contraseña incorrectos");
        }
        return UserResponse.from(user);
    }
}
