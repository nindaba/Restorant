package com.yadlings.itemservice.Controllers;


import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Models.CategoryItemModel;
import com.yadlings.itemservice.Models.PostPutRequest;
import com.yadlings.itemservice.Services.CategoryService;
import com.yadlings.itemservice.Services.CloudStorageService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("item-service/category")
@AllArgsConstructor
@Log4j2
public class CategoryController {

    private CategoryService categoryService;
    private CloudStorageService cloudStorageService;

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable("id") String id){
        return categoryService.getCategory(id);
    }
    @GetMapping
    public ResponseEntity<List<Category>> getCategory(){
        return categoryService.getCategory();
    }
    @GetMapping("/{id}/items")
    public ResponseEntity<CategoryItemModel> getCategoryItem(@PathVariable("id") String id){
        return categoryService.getCategoryItem(id);
    }
    @GetMapping("/items")
    public ResponseEntity<List<CategoryItemModel>> getCategoryItem(){
        return categoryService.getCategoryItem();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id){
        return categoryService.deleteCategory();
    }
    @DeleteMapping
    public ResponseEntity<Category> delete(){
        return categoryService.deleteCategory();
    }
    @PutMapping("/{id}")
    //todo change the exception to custom image exception
    public ResponseEntity<Category> putCategory(@PathVariable("id") String id,@RequestBody PostPutRequest<Category> request) throws Exception{
        var category = request.getT();
        //upload the image to azure and get the link in the category image
        MultipartFile image = request.getImage();
// todo       if(image.getContentType() != null && ==image) throw new Exception("Content-Type Not supported");
        if(!image.isEmpty()) category.setImage(cloudStorageService.uploadToAzureStorage(image));
        return categoryService.putCategory(id,category);
    }
    @PostMapping
    public ResponseEntity<?> getCategory(@RequestBody PostPutRequest<Category> request) throws Exception{
        var category = request.getT();
        //upload the image to azure and get the link in the category image
        MultipartFile image = request.getImage();
        if(image.isEmpty()) throw new Exception("Image can not be empty");
// todo       if(image.getContentType() != ) throw new Exception("Content-Type Not supported");
        log.warn("IMAGE TYPE {}",image.getContentType());
        category.setImage(cloudStorageService.uploadToAzureStorage(image));
        return categoryService.saveCategory(category);
    }
}
