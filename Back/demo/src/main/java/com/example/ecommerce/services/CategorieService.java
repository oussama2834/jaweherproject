package com.example.ecommerce.services;

import com.example.ecommerce.entities.Categorie;
import com.example.ecommerce.repositories.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {
    @Autowired
    CategorieRepository categorieRepository;
    public Categorie saveCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }


    public Categorie updateCategorie(Categorie categorie,Long id) {
        Categorie categorieExistant = categorieRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Produit non trouvé avec l'ID spécifié: " + id));
        categorieExistant.setNom(categorie.getNom());

        return categorieRepository.save(categorieExistant);
    }


    public void deleteCategorieById(Long id) {
        categorieRepository.deleteById(id);
    }


    public Categorie getCategorieById(Long id) {
        return categorieRepository.findById(id).get();
    }


    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }
}
