package com.example.ecommerce.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @NonNull
    private Long id;
    private String nom;
    private String prenom;
    private String username;
    private String email;
    private String adresse;
    private String ville;
    private String numero;
    private String motDePasse ;
//    @OneToMany(fetch=FetchType.EAGER,cascade = CascadeType.MERGE)
//    private List<Role> roles;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
     private List<Role> roles;
}
