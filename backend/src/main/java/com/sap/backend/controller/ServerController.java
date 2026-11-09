package com.sap.backend.controller;

import com.sap.backend.dto.ServerRequest;
import com.sap.backend.dto.ServerResponse;
import com.sap.backend.dto.StatusRequest;
import com.sap.backend.model.Server;
import com.sap.backend.repository.ServerRepository;
import com.sap.backend.repository.ServiceItemRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/servers")
public class ServerController {

    private final ServerRepository servers;
    private final ServiceItemRepository services;

    public ServerController(ServerRepository servers, ServiceItemRepository services) {
        this.servers = servers;
        this.services = services;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<ServerResponse> list() {
        return servers.findAll().stream().map(ServerResponse::from).toList();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ServerResponse get(@PathVariable Integer id) {
        return ServerResponse.from(find(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public ServerResponse create(@RequestBody ServerRequest request) {
        Server server = new Server();
        apply(server, request);
        return ServerResponse.from(servers.save(server));
    }

    @PutMapping("/{id}")
    @Transactional
    public ServerResponse update(@PathVariable Integer id, @RequestBody ServerRequest request) {
        Server server = find(id);
        apply(server, request);
        return ServerResponse.from(servers.save(server));
    }

    @PatchMapping("/{id}/status")
    @Transactional
    public ServerResponse setStatus(@PathVariable Integer id, @RequestBody StatusRequest request) {
        if (!"online".equals(request.status()) && !"offline".equals(request.status())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El estado debe ser 'online' u 'offline'");
        }
        Server server = find(id);
        server.setOnline("online".equals(request.status()));
        return ServerResponse.from(servers.save(server));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void delete(@PathVariable Integer id) {
        Server server = find(id);
        services.deleteByServerId(id);
        servers.delete(server);
    }

    private Server find(Integer id) {
        return servers.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servidor no encontrado: " + id));
    }

//  VALIDACION DE CAMPOS Y TRASPASO A LA ENTIDAD
    private void apply(Server s, ServerRequest r) {
        if (isBlank(r.name())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio");
        }
        if (isBlank(r.mac())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La MAC es obligatoria");
        }
        s.setName(r.name().trim());
        s.setMac(r.mac().trim());
        s.setIpv4(emptyToNull(r.ipv4()));
        s.setIpv6(emptyToNull(r.ipv6()));
        s.setOs(emptyToNull(r.os()));
        s.setCpu(emptyToNull(r.cpu()));
        s.setGpu(emptyToNull(r.gpu()));
        s.setRam(emptyToNull(r.ram()));
        s.setStorage(emptyToNull(r.storage()));
        s.setSystemUser(emptyToNull(r.systemUser()));
        s.setSystemPassword(isBlank(r.systemPassword()) ? null : r.systemPassword());
        s.setDbUser(emptyToNull(r.dbUser()));
        s.setDbPassword(isBlank(r.dbPassword()) ? null : r.dbPassword());
    }

    private static boolean isBlank(String v) {
        return v == null || v.isBlank();
    }

    private static String emptyToNull(String v) {
        return isBlank(v) ? null : v.trim();
    }
}
