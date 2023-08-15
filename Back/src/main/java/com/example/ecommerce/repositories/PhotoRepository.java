package com.example.ecommerce.repositories;


import com.example.ecommerce.entities.LignePanier;
import com.example.ecommerce.entities.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo,Long> {
    @Query("SELECT p FROM Photo p WHERE p.produit.id = :id")
    List<Photo> findPhotosByproduitId(@Param("id") Long id);
}