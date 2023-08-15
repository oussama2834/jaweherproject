package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.*;
import com.example.ecommerce.repositories.CommandeRepository;
import com.example.ecommerce.repositories.LignepanierRepository;
import com.example.ecommerce.repositories.PanierRepository;
import com.example.ecommerce.services.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    LignepanierRepository lignePanierRepository;
    @Autowired
    PanierRepository panierRepository;
    @Autowired
    CommandeRepository commandeRepository;
    @GetMapping
    public List<User> allUsers() {
        return userService.getAllUsers();
    }
    @PostMapping
    public  User saveUser(@RequestBody  User  user) {
        return userService.saveUser(user);
    }
    @PostMapping("/login")
    public LoginResponse Login (@RequestBody LoginRequest loginRequest){
      return  userService.Login(loginRequest);
    }
  @PostConstruct
  public void CreateRoles(){
        userService.CreateRoles();
  }
  @PostConstruct
  public void createAdmin(){
        userService.RegistredAdmin();
  }
    @PostMapping("/register")
    public User Register (@RequestBody User user){
        return  userService.Register(user);
    }

//    @PostConstruct
//    public void RegistredAdmin(){
//        userService.RegistredAdmin();
//    }

    @GetMapping("/getUserById")
    public User getUser(@RequestParam Long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping
    public String deleteUserById(@RequestParam Long id) {

        Panier panier = panierRepository.findPanierByuserId(id);

        if (panier == null){
            userService.deleteUserById(id);
            return "user supprimé !";
        } else {
            Commande commande = commandeRepository.findCommandeBypanierId(panier.getId());
            List<LignePanier> lignes = lignePanierRepository.findLignePanierBypanierId(panier.getId());
            if (lignes == null){
                userService.deleteUserById(id);
                return "user supprimé !";
            } else {
                commandeRepository.deleteById(commande.getId());
                lignePanierRepository.deleteAll(lignes);
                panierRepository.deleteById(panier.getId());
                userService.deleteUserById(id);
                return "user supprimé !";
            }


        }


    }


    @PutMapping
    public  User updateUser(@RequestBody  User user,@RequestParam Long id) {
        return userService.updateuser(user,id);
    }
}


