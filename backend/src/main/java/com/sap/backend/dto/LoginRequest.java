package com.sap.backend.dto;

// VALIDO TANTO USUARIO COMO EMAIL
public record LoginRequest(String username, String password) {
}
