package com.sap.backend.dto;

import com.sap.backend.model.ServiceItem;

public record ServiceItemResponse(
        String id, String serverId, String name, Integer port,
        String ipv4, String ipv6, String status, String description) {

    public static ServiceItemResponse from(ServiceItem s) {
        String ipv4 = blank(s.getServer().getIpv4()) ? "" : s.getServer().getIpv4() + ":" + s.getPort();
        String ipv6 = blank(s.getServer().getIpv6()) ? "" : "[" + s.getServer().getIpv6() + "]:" + s.getPort();
        return new ServiceItemResponse(
                String.valueOf(s.getId()), String.valueOf(s.getServer().getId()), s.getName(), s.getPort(),
                ipv4, ipv6, s.isStatus() ? "online" : "offline",
                s.getDescription() == null ? "" : s.getDescription());
    }

    private static boolean blank(String v) {
        return v == null || v.isBlank();
    }
}
