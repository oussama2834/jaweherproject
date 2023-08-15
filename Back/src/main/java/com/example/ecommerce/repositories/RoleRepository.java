package com.example.ecommerce.repositories;



import com.example.ecommerce.entities.ERole;
import com.example.ecommerce.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Role findByRole(String name);

}