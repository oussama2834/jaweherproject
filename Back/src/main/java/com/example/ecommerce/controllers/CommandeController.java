package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.Commande;
import com.example.ecommerce.repositories.CommandeRepository;
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
    @Autowired
    CommandeRepository commandeRepository;
    @GetMapping("getAll")
    public List<Commande> getAllCommandes(){
        return commandeService.getCommandes();
    }

    @PostMapping("post")
    public Commande addCommande(@RequestBody Commande commande){
        return commandeService.AddCommande(commande);

    }
    @PutMapping("valid")
    public Commande ValiderCommande(@RequestBody Commande commande){
        commande.setEtat("valide");
    return  commandeRepository.save(commande);
    }
    @PutMapping("refuse")
    public Commande RefuserCommande(@RequestBody Commande commande){
        commande.setEtat("refuse");
        return  commandeRepository.save(commande);

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
