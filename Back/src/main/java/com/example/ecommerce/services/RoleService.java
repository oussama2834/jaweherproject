package com.example.ecommerce.services;



import com.example.ecommerce.entities.ERole;
import com.example.ecommerce.entities.Role;
import com.example.ecommerce.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;



    public Role saveRole(Role roleName) {
      String name = roleName.getRole().toUpperCase();
      roleName.setRole(name);
      return roleRepository.save(roleName);

    }
    public void deleteRole(Long id){
        roleRepository.deleteById(id);
    }



    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
