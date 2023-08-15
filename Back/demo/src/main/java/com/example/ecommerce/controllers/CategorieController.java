package com.example.ecommerce.controllers;
import com.example.ecommerce.entities.Categorie;
import com.example.ecommerce.entities.Produit;
import com.example.ecommerce.services.CategorieService;
import com.example.ecommerce.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/categories")
public class CategorieController {
    @Autowired
    CategorieService categorieService;


    @GetMapping("/getCategorieById")
    public  Categorie getCategorie(@RequestParam Long id) {
        return categorieService.getCategorieById(id);
    }

    @GetMapping
    public List< Categorie> allCategories() {
        return categorieService.getAllCategories();
    }

    @DeleteMapping
    public void deleteCategorieById(@RequestParam Long id) {
        categorieService.deleteCategorieById(id);
    }

    @PostMapping
    public  Categorie saveCategorie(@RequestBody  Categorie  categorie) {
        return categorieService.saveCategorie(categorie);
    }

    @PutMapping
    public  Categorie updateCategorie(@RequestBody  Categorie  categorie,@RequestParam Long id) {
        return categorieService.updateCategorie(categorie,id);
    }
}
