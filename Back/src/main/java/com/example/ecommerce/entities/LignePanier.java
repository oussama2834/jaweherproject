package com.example.ecommerce.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class LignePanier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @NonNull
    private Long id;

    @ManyToOne
    private Produit produit;
    private Long quantite = 1L;
//    private Long nbr_produit;
    private double total ;
    @ManyToOne(fetch=FetchType.EAGER,cascade =CascadeType.MERGE)
    @JoinColumn(name = "panier_id")
    @JsonBackReference
    Panier panier;
    @PrePersist
    public void calculerTotal (){
      this.total = this.quantite*produit.getPrix();
    }


}
