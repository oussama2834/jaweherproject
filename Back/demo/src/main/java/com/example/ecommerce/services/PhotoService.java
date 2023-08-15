package com.example.ecommerce.services;

import com.example.ecommerce.entities.Photo;
import com.example.ecommerce.entities.Produit;
import com.example.ecommerce.entities.Role;
import com.example.ecommerce.repositories.PhotoRepository;
import com.example.ecommerce.repositories.ProduitRepository;
import com.example.ecommerce.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {
    @Autowired
    PhotoRepository photoRepository;
    @Autowired
    ProduitRepository produitRepository;



    public Photo savePhoto(Photo photo , Long id) {
        Produit produit = produitRepository.findById(id).orElse(null);
        photo.setProduit(produit);
        return photoRepository.save(photo);

    }
    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }

}
