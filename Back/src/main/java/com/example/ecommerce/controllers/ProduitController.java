package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.LignePanier;
import com.example.ecommerce.entities.Panier;
import com.example.ecommerce.entities.Photo;
import com.example.ecommerce.entities.Produit;
import com.example.ecommerce.repositories.LignepanierRepository;
import com.example.ecommerce.repositories.PanierRepository;
import com.example.ecommerce.repositories.PhotoRepository;
import com.example.ecommerce.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/produits")
public class ProduitController {
    @Autowired
    ProduitService produitService;
    @Autowired
    LignepanierRepository lignePanierRepository;
    @Autowired
    PhotoRepository photoRepository;


    @GetMapping("/getArticleById")
    public Produit getProduit(@RequestParam Long id) {
        return produitService.getProduitById(id);
    }

    @GetMapping
    public List<Produit> allProducts() {
        return produitService.getAllProducts();
    }

    @DeleteMapping
    public void deleteProduitById(@RequestParam Long id) {

            List<Photo> photos = photoRepository.findPhotosByproduitId(id);
            List<LignePanier> lignes = lignePanierRepository.findLignePanierByproduitId(id);
            if (lignes == null && photos == null ){
             produitService.deleteProduitById(id);

            } else if (lignes == null && photos != null) {
                photoRepository.deleteAll(photos);
                produitService.deleteProduitById(id);

            } else if (lignes != null && photos == null){
                lignePanierRepository.deleteAll(lignes);
                produitService.deleteProduitById(id);
            } else {
                lignePanierRepository.deleteAll(lignes);
                photoRepository.deleteAll(photos);
                produitService.deleteProduitById(id);

            }




    }

    @PostMapping
    public Produit saveProduit(@RequestBody Produit produit) {
        return produitService.saveProduit(produit);
    }

    @PutMapping
    public Produit updateProduit(@RequestBody Produit produit,@RequestParam Long id) {
        return produitService.updateProduit(produit,id);
    }

}
