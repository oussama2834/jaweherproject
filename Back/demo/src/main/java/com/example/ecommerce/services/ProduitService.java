package com.example.ecommerce.services;

import com.example.ecommerce.entities.Produit;
import com.example.ecommerce.repositories.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {
    @Autowired
    ProduitRepository produitRepository;



    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }


    public Produit updateProduit(Produit produit,Long id) {
        Produit produitExistant = produitRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Produit non trouvé avec l'ID spécifié: " + id));
        produitExistant.setNom(produit.getNom());
        produitExistant.setPrix(produit.getPrix());
        produitExistant.setGarantit(produit.getGarantit());
        produitExistant.setPoids(produit.getPoids());
        produitExistant.setPhotos(produit.getPhotos());
        produitExistant.setQuantite(produit.getQuantite());
        return produitRepository.save(produitExistant);
    }


    public void deleteProduitById(Long id) {
        produitRepository.deleteById(id);
    }


    public Produit getProduitById(Long id) {
        return produitRepository.findById(id).get();
    }


    public List<Produit> getAllProducts() {
        return produitRepository.findAll();
    }
}
