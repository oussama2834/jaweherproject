package com.example.ecommerce.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Panier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @NonNull
    private Long id;
    @OneToMany(mappedBy = "panier",fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<LignePanier> lignepaniers ;
    private double total =0;
    @OneToOne
    User user;
}
