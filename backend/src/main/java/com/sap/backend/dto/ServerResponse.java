package com.sap.backend.dto;

import com.sap.backend.model.Server;

public record ServerResponse(
        String id, String name, String status,
        String mac, String ipv4, String ipv6,
        String os, String cpu, String gpu, String ram, String storage,
        String systemUser, String systemPassword, String dbUser, String dbPassword) {

    public static ServerResponse from(Server s) {
        return new ServerResponse(
                String.valueOf(s.getId()), s.getName(), s.isOnline() ? "online" : "offline",
                nz(s.getMac()), nz(s.getIpv4()), nz(s.getIpv6()),
                nz(s.getOs()), nz(s.getCpu()), nz(s.getGpu()), nz(s.getRam()), nz(s.getStorage()),
                nz(s.getSystemUser()), nz(s.getSystemPassword()), nz(s.getDbUser()), nz(s.getDbPassword()));
    }

    private static String nz(String value) {
        return value == null ? "" : value;
    }
}
