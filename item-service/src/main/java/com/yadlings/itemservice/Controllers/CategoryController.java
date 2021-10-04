package com.yadlings.itemservice.Controllers;


import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Models.CategoryItemModel;
import com.yadlings.itemservice.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("item-service/category")
//To be configured in Security
@CrossOrigin
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

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
    public ResponseEntity<Category> putCategory(@PathVariable("id") String id,@RequestBody Category category){
        return categoryService.putCategory(id,category);
    }
    @PostMapping
    public ResponseEntity<?> getCategory(@RequestBody Category category){
        return categoryService.saveCategory(category);
    }
}
