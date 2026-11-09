package com.sap.backend.controller;

import com.sap.backend.dto.ServiceItemResponse;
import com.sap.backend.repository.ServiceItemRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/services")
public class ServiceItemController {

    private final ServiceItemRepository services;

    public ServiceItemController(ServiceItemRepository services) {
        this.services = services;
    }

    /** GET /api/services   o   GET /api/services?serverId=1 */
    @GetMapping
    public List<ServiceItemResponse> list(@RequestParam(required = false) Integer serverId) {
        return (serverId == null ? services.findAll() : services.findByServerId(serverId))
                .stream().map(ServiceItemResponse::from).toList();
    }
}
