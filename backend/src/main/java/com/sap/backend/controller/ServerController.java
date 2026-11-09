package com.sap.backend.controller;

import com.sap.backend.dto.ServerResponse;
import com.sap.backend.repository.ServerRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/servers")
public class ServerController {

    private final ServerRepository servers;

    public ServerController(ServerRepository servers) {
        this.servers = servers;
    }

    @GetMapping
    public List<ServerResponse> list() {
        return servers.findAll().stream().map(ServerResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ServerResponse get(@PathVariable Integer id) {
        return servers.findById(id)
                .map(ServerResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servidor no encontrado: " + id));
    }
}
