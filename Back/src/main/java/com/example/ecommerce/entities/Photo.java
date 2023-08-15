package com.example.ecommerce.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @NonNull
    private Long id;
    private String title ;
    @Column(columnDefinition = "LONGTEXT")
    private String description ;
    @Column(columnDefinition = "LONGTEXT")
    private String url ;
    @JsonIgnore
    @ManyToOne
    private Produit produit ;

}
