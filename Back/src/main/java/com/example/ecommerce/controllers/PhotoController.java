package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.Photo;
import com.example.ecommerce.entities.Role;
import com.example.ecommerce.services.PhotoService;
import com.example.ecommerce.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/photos")
public class PhotoController {

    @Autowired
    PhotoService photoService;
    @GetMapping
    public List<Photo> allPhotos() {
        return photoService.getAllPhotos();
    }


    @PostMapping
    public Photo AddPhoto(@RequestBody  Photo  photo,@RequestParam Long id)
    {
        return photoService.savePhoto(photo,id);
    }
}
