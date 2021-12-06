package com.yadlings.itemservice.Services;

import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Documents.Item;
import com.yadlings.itemservice.Models.CategoryItemModel;
import com.yadlings.itemservice.Repositories.CategoryRepository;
import com.yadlings.itemservice.Repositories.ItemRepository;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.function.IntFunction;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryService {
    private CategoryRepository categoryRepository;
    private ItemRepository itemRepository;

    /**
     * Controller Methods
     */
    public ResponseEntity<List<Category>> getCategory(){
        List<Category> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }
    public ResponseEntity<Category> getCategory(String id){
        return categoryRepository
                .findById(id)
                .map(category1 -> new ResponseEntity<>(category1,HttpStatus.OK))
                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    public ResponseEntity deleteCategory(String id){
        boolean present = categoryRepository
                .findById(id)
                .isPresent();
        categoryRepository
                .deleteById(id);
        //ToDo must throw a custom exception for deleting a non available category
        return present ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    public ResponseEntity deleteCategory(){
        categoryRepository
                .deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
    public ResponseEntity putCategory(String id,Category category){
        return categoryRepository
                .findById(id)
                .map(category1 -> {
                    category.setId(category1.getId());
                    categoryRepository.save(category);
                    return new ResponseEntity(HttpStatus.OK);
                })
                .orElseGet(()-> new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<HttpHeaders> saveCategory(Category category){
        boolean empty = categoryRepository
                .findByName(category.getName())
                .isEmpty();
        if(empty){
		//sometimes the id can come with empty "" this will cause a bug, where the id will not be set by mongo
		category.setId(null);
            String id = categoryRepository.save(category).getId();
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(
                    ServletUriComponentsBuilder
                            .fromCurrentRequest()
                            .path("/{id}")
                            .build(id)
            );
            return new ResponseEntity<>(httpHeaders,HttpStatus.OK);
        }
        //ToDo throw Custom Exception for already existing category name
        else return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
    public ResponseEntity<CategoryItemModel> getCategoryItem(String categoryId){
        return categoryRepository
                .findById(categoryId)
                .map(this::transformToCategoryItem)
                .map(categoryItemModel -> new ResponseEntity<>(categoryItemModel, HttpStatus.OK))
                .orElseGet(()->new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }
    public ResponseEntity<List<CategoryItemModel>> getCategoryItem(){
        List<CategoryItemModel> categoryItemModelList = categoryRepository
                .findAll()
                .stream()
                .map(this::transformToCategoryItem)
                .collect(Collectors.toList());
        return new ResponseEntity<>(categoryItemModelList, HttpStatus.OK);


    }

    /**
     * This will get all the items.Id in the category and use the item repository to retrieve them
     * therefore ty will all be mapped to Category Item Model
     * @param category
     * @return CategoryItemModel
     */
    private CategoryItemModel transformToCategoryItem(Category category) {
        List<Item> items = category
                .getItems()
                .stream()
                .map(itemRepository::findById)
                .map(Optional::get)
                .collect(Collectors.toList());
        return new CategoryItemModel
                .CategoryItemModelBuilder()
                .setId(category.getId())
                .setName(category.getName())
                .setDescription(category.getDescription())
                .setImage(category.getImage())
                .setItems(items)
                .build();
    }

    private void deleteItem(List<String> ids){
        ids
                .stream()
                .forEach(itemRepository::deleteById);
    }

}
