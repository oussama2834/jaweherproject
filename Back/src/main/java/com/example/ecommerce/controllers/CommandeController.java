package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.Commande;
import com.example.ecommerce.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/commande/")
public class CommandeController {
    @Autowired
    CommandeService commandeService;
    @GetMapping("getAll")
    public List<Commande> getAllCommandes(){
        return commandeService.getCommandes();
    }

    @PostMapping("post")
    public Commande addCommande(@RequestBody Commande commande){
        return commandeService.AddCommande(commande);

    }
    @GetMapping("get/{num}")
    public Commande getCommande(@PathVariable Long num){
        return commandeService.getCommanderById(num);
    }

    @DeleteMapping("delete/{num}")
    public void deleteCommande(@PathVariable Long num){
        commandeService.deleteCommande(num);
    }
}
