package com.sap.backend.repository;

import com.sap.backend.model.Server;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class ServerRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Server> findAll() {
        return em.createQuery("select s from Server s order by s.id", Server.class).getResultList();
    }

    public Optional<Server> findById(Integer id) {
        return Optional.ofNullable(em.find(Server.class, id));
    }

    public Server save(Server server) {
        if (server.getId() == null) {
            em.persist(server);
            return server;
        }
        return em.merge(server);
    }

    public void delete(Server server) {
        em.remove(server);
    }
}
