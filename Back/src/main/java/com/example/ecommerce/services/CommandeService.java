package com.example.ecommerce.services;

import com.example.ecommerce.entities.Commande;
import com.example.ecommerce.repositories.CommandeRepository;
import com.example.ecommerce.repositories.PanierRepository;
import com.example.ecommerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandeService {
    @Autowired
    CommandeRepository commandeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PanierRepository panierRepository;
    public Commande AddCommande(Commande commande) {
        return commandeRepository.save(commande);
    }
    public void deleteCommande(Long id) {

        commandeRepository.deleteById(id);

    }


    public List<Commande> getCommandes() {
        return commandeRepository.findAll();
    }


    public Commande getCommanderById(Long id) {
        return commandeRepository.findById(id).get();
    }


    public Commande updateCommande(Long id, Commande commande) {
        return null;
    }
}
