package com.example.ecommerce.services;

import com.example.ecommerce.entities.LignePanier;
import com.example.ecommerce.entities.Panier;
import com.example.ecommerce.repositories.LignepanierRepository;
import com.example.ecommerce.repositories.PanierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LignepanierService {
    @Autowired
    LignepanierRepository lignePanierRepository;
    @Autowired
    PanierRepository panierRepository;
    public LignePanier AddlignePanier(LignePanier lignePanier) {
        LignePanier ligne = lignePanierRepository.save(lignePanier);
        List<LignePanier> list = new ArrayList<>();
        list.add(ligne);
        double total =0;
        Panier panier = new Panier();
        panier.setLignepaniers(list);
        for (LignePanier lignePanier1 : list){
            total += lignePanier1.getTotal();
        }
        panier.setTotal(total);
        panierRepository.save(panier);
        return ligne;


    }
    public LignePanier updatelignePanier( LignePanier lignePanier,Long id) {
        lignePanier.setTotal(lignePanier.getQuantite() * lignePanier.getProduit().getPrix());
        lignePanierRepository.save(lignePanier);
        Optional<Panier> Optionalpanier = panierRepository.findById(id);
        double sum = 0;
        if (Optionalpanier.isPresent()) {
            Panier panier = Optionalpanier.get();
            for (LignePanier ligne : panier.getLignepaniers()) {
                sum += ligne.getTotal();
            }
            panier.setTotal(sum);
            panierRepository.save(panier);
            lignePanier.setPanier(panier);
            lignePanierRepository.save(lignePanier);

            return lignePanier;
        }
        return null;
    }


    public void DeletelignePanier(Long id) {
        LignePanier lignepanier = lignePanierRepository.findById(id).orElse(null);
        if(lignepanier != null) {
            Panier panier = lignepanier.getPanier();
            panier.setTotal(panier.getTotal() - lignepanier.getTotal());
            panierRepository.save(panier);
            lignePanierRepository.deleteById(id);
        }
    }

    public LignePanier getlignePanierById(Long id) {
        LignePanier ligne =  lignePanierRepository.findById(id).orElse(null);
        if(ligne != null){
            return ligne;
        }
        return null;
    }
    public List<LignePanier> getLignepanier() {
        return lignePanierRepository.findAll();
    }
}
