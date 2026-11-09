package com.sap.backend.repository;

import com.sap.backend.model.ServiceItem;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ServiceItemRepository {

    @PersistenceContext
    private EntityManager em;

    public List<ServiceItem> findAll() {
        return em.createQuery(
                "select s from ServiceItem s join fetch s.server order by s.id", ServiceItem.class)
                .getResultList();
    }

    public List<ServiceItem> findByServerId(Integer serverId) {
        return em.createQuery(
                "select s from ServiceItem s join fetch s.server sv where sv.id = :serverId order by s.id",
                ServiceItem.class)
                .setParameter("serverId", serverId)
                .getResultList();
    }
}
