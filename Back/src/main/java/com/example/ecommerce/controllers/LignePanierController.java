package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.LignePanier;
import com.example.ecommerce.services.LignepanierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/lignepanier/")
public class LignePanierController {
    @Autowired
    LignepanierService lignePanierService;
    @GetMapping("getAll")
    public List<LignePanier> getAllLignesPaniers(){
        return lignePanierService.getLignepanier();
    }

    @PostMapping("post")
    @ResponseBody
    public LignePanier addLignePanier(@RequestBody LignePanier lPanier){
        return lignePanierService.AddlignePanier(lPanier);

    }
    @GetMapping("get/{id}")
    public LignePanier getlignePanierById(@PathVariable Long id) {
        return lignePanierService.getlignePanierById(id);
    }
    @PutMapping("edit/{id}")
    public LignePanier edit(@RequestBody LignePanier lignePanier,@PathVariable Long id){
        return lignePanierService.updatelignePanier(lignePanier,id);
    }
    @DeleteMapping("delete/{id}")
    public void deleteLignePanier(@PathVariable Long id){
        lignePanierService.DeletelignePanier(id);
    }
}
