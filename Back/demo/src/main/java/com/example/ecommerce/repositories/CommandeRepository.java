package com.example.ecommerce.repositories;

import com.example.ecommerce.entities.Categorie;
import com.example.ecommerce.entities.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande,Long> {
    @Query(" SELECT c FROM Commande c WHERE c.panier.id = :id")
    Commande findCommandeBypanierId(@Param("id") Long id);
}
