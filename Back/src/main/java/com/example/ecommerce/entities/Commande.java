package com.example.ecommerce.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @NonNull
    private Long id;
    @OneToOne
    private Panier panier ;

    private String adresse_livraison;
    private String code;
    private String etat;
//    @ManyToOne(cascade = CascadeType.MERGE)
//    User user;


}
