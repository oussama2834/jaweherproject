package com.example.ecommerce.services;

import com.example.ecommerce.entities.LignePanier;
import com.example.ecommerce.entities.Panier;
import com.example.ecommerce.entities.User;
import com.example.ecommerce.repositories.LignepanierRepository;
import com.example.ecommerce.repositories.PanierRepository;
import com.example.ecommerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PanierService {
    @Autowired
    PanierRepository panierRepository;
    @Autowired
    LignepanierRepository lignePanierRepository;
    @Autowired
    UserRepository userRepository;

    public List<Panier> getPanier() {
        return panierRepository.findAll();
    }
    public Panier Addpanier(Long userId, LignePanier lignePanier) {
        double sum = 0;
        lignePanierRepository.save(lignePanier);
        User user = userRepository.findById(userId).get();
        List<LignePanier> lignepaniers = new ArrayList<>();
        Panier panier = panierRepository.findPanierByuserId(userId);
        if (panier != null){
            lignePanier.setPanier(panier);
            lignepaniers = panier.getLignepaniers();
            lignepaniers.add(lignePanier);
            panier.setLignepaniers(lignepaniers);
            for( LignePanier ligne:  panier.getLignepaniers()){
                sum += ligne.getTotal();
            }
            panier.setTotal(sum);
            return panierRepository.save(panier);
        }
        Panier Newpanier = new Panier();
        panierRepository.save(Newpanier);
        lignePanier.setPanier(Newpanier);
        lignepaniers.add(lignePanier);
        Newpanier.setLignepaniers(lignepaniers);
        Newpanier.setUser(user);
        for( LignePanier ligne:  Newpanier.getLignepaniers()){
            sum += ligne.getTotal();
        }

        Newpanier.setTotal(sum);
        return   panierRepository.save(Newpanier);
    }
    public Panier updatepanier( Panier panier) {
        double sum = 0;
        for( LignePanier ligne:  panier.getLignepaniers()){
            ligne.setTotal(ligne.getQuantite()*ligne.getProduit().getPrix());
            sum += ligne.getTotal();
        }
        panier.setTotal(sum);
        return panierRepository.save(panier);


    }
}
