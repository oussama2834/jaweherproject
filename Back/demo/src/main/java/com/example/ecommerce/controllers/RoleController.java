package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.Role;
import com.example.ecommerce.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    RoleService roleService;
    @GetMapping
    public List<Role> allRoles() {
        return roleService.getAllRoles();
    }


    @PostMapping
    public Role saveRole(@RequestBody  Role  role) {
        return roleService.saveRole(role);
    }
    @DeleteMapping
    public void deleteRole (@RequestParam Long id){
          roleService.deleteRole(id);

    }
}
