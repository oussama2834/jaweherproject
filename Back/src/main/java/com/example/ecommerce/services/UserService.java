package com.example.ecommerce.services;



import com.example.ecommerce.entities.*;
import com.example.ecommerce.repositories.RoleRepository;
import com.example.ecommerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    RoleRepository roleRepository;


    public User saveUser(User user) {
         user.setMotDePasse(passwordEncoder.encode(user.getMotDePasse()));
         Role roleClient = roleRepository.findByRole("CLIENT");


         List<Role> roles = new ArrayList<>();
         roles.add(roleClient);
         user.setRoles(roles);
        return userRepository.save(user);
    }
    public LoginResponse Login (LoginRequest loginrequest){
        User user = userRepository.findByUsername(loginrequest.getUsername());

        if (user ==null){
          return null;
        }  else {
            List<Role> roles = user.getRoles();
            Role role = roles.get(0);
            return  LoginResponse.getInstance(user,role);
        }

    }

    public void RegistredAdmin(){
        User adminUser = userRepository.findByUsername("admin");
        if (adminUser == null){
            User admin = new User();
            admin.setNom("admin");
            admin.setPrenom("admin");
            admin.setVille("Tunis");
            admin.setNumero("23207871");
            admin.setEmail("admin@gmail.com");
            admin.setUsername("admin");
            admin.setAdresse("adresse1");
            admin.setMotDePasse(passwordEncoder.encode("admin"));
            List<Role> roles = new ArrayList<>() ;
            Role role = roleRepository.findByRole("ADMIN");
            roles.add(role);
            admin.setRoles(roles);
            userRepository.save(admin);
        } else {
            System.out.println("admin is already exist");
        }


    }
    public void CreateRoles(){
        Role adminRole = roleRepository.findByRole("ADMIN");
        Role clientRole = roleRepository.findByRole("CLIENT");
        if (adminRole == null){
            Role roleadmin = new Role();
            roleadmin.setRole("ADMIN");
            roleRepository.save(roleadmin);
        } else {
            System.out.println("admin is already exist");
        }
        if (clientRole == null){

            Role roleclient = new Role();
            roleclient.setRole("CLIENT");
            roleRepository.save(roleclient);
        } else {
            System.out.println("client is already exist");
        }




    }

    public User Register(User user){

        List<Role> roles = Arrays.asList();
        Role role = new Role();
        role.setRole("CLIENT");
        roles.add(role);
        user.setRoles(roles);
        return userRepository.save(user);

    }


    public User updateuser(User user,Long id) {
        User userExistant = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User non trouvé avec l'ID spécifié: " + id));
        userExistant.setNom(user.getNom());
        userExistant.setPrenom(user.getPrenom());
        userExistant.setUsername(user.getUsername());
        userExistant.setEmail(user.getEmail());
        userExistant.setAdresse(user.getAdresse());
        userExistant.setVille(user.getVille());
        userExistant.setNumero(user.getNumero());

        return userRepository.save(userExistant);
    }



    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }


    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
