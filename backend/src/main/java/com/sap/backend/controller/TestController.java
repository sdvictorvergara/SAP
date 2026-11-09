package com.sap.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/hola")
    public String decirHola() {
        return "¡Hola! Tu API de Spring Boot está funcionando correctamente.";
    }
}