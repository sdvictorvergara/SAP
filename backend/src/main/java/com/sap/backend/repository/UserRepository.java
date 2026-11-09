package com.sap.backend.repository;

import com.sap.backend.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager entitymanager;

    public Optional<User> findByEmail(String email) {
        return entitymanager.createQuery("select u from User u where u.email = :email order by u.id", User.class)
                .setParameter("email", email)
                .setMaxResults(1)
                .getResultStream()
                .findFirst();
    }

    public Optional<User> findByName(String name) {
        return entitymanager.createQuery("select u from User u where u.name = :name order by u.id", User.class)
                .setParameter("name", name)
                .setMaxResults(1)
                .getResultStream()
                .findFirst();
    }
}
