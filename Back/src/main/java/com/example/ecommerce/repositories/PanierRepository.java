package com.example.ecommerce.repositories;

import com.example.ecommerce.entities.Panier;
import com.example.ecommerce.entities.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PanierRepository extends JpaRepository<Panier,Long> {
    @Query("SELECT p FROM Panier p WHERE p.user.id = :id")
    Panier findPanierByuserId(@Param("id") Long id);

}
