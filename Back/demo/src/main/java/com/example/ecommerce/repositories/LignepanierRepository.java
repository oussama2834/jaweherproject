package com.example.ecommerce.repositories;

import com.example.ecommerce.entities.LignePanier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LignepanierRepository extends JpaRepository<LignePanier,Long> {
    @Query("SELECT l FROM LignePanier l WHERE l.panier.id = :id")
    List<LignePanier> findLignePanierBypanierId(@Param("id") Long id);
    @Query("SELECT l FROM LignePanier l WHERE l.produit.id = :id")
    List<LignePanier> findLignePanierByproduitId(@Param("id") Long id);
}
