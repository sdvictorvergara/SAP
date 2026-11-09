package com.sap.backend.dto;

public record ServerRequest(
        String name, String mac, String ipv4, String ipv6,
        String os, String cpu, String gpu, String ram, String storage,
        String systemUser, String systemPassword, String dbUser, String dbPassword) {
}
