package com.example.ecommerce.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @NonNull
    private Long id;
    private static Produit instance;

    @OneToMany(mappedBy = "produit")
    private List<Photo> photos ;

    private String nom;
    private double prix;
    private Long quantite;
    private String garantit;
    private double poids;
    @ManyToOne
    private Categorie categorie;

    public static Produit getInstance(@NonNull Long id, List<Photo> photos, String nom,
                                      double prix, Long quantite, String garantit, double poids,Categorie categorie) {
        if (instance == null) {
            instance = new Produit( id,  photos,  nom, prix, quantite, garantit, poids,categorie);
        }
        return instance;
    }
}
