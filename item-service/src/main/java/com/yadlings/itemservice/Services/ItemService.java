package com.yadlings.itemservice.Services;

import com.yadlings.itemservice.Documents.Item;
import com.yadlings.itemservice.Repositories.CategoryRepository;
import com.yadlings.itemservice.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
@Service
public class ItemService implements ItemServiceInterface{
    @Autowired
    private ItemRepository repository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public ResponseEntity<Item> getItem(String id) {
        return repository
                .findById(id)
                .map(item -> new ResponseEntity<>(item, HttpStatus.OK))
                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<?> saveItem(String id, Item item) {
        return repository
                .findById(id)
                .map(savedItem -> {
                    item.setId(savedItem.getId());
                    repository.save(item);
                    return new ResponseEntity<>(HttpStatus.OK);
                })
                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<?> deleteItem(String id) {
        return repository
                .findById(id)
                .map(savedItem -> {
                    repository.deleteById(id);
                    deleteCategoryItem(savedItem.getCategory(), id);
                    return new ResponseEntity<>(HttpStatus.OK);
                })
                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpHeaders> saveItem(Item item) {
        boolean validItem = !isItemNameExist(item.getName());
        boolean category = isCategory(item.getCategory());
        validItem &= category;
        if(validItem){
            Item save = repository.save(item);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(
                    ServletUriComponentsBuilder
                            .fromCurrentRequest()
                            .path("/{id}")
                            .build(save.getId())
            );
            addCategoryItem(item.getCategory(), item.getId());
            return new ResponseEntity<>(httpHeaders,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    private boolean isCategory(String id){
        return categoryRepository.findById(id)
                .isPresent();
    }
    private boolean isItemNameExist(String name){
        return repository
                .findByName(name)
                .isPresent();
    }
    private void addCategoryItem(String categoryId,String itemId){
        categoryRepository.findById(categoryId)
                .map(category -> {
                    category.getItems().add(itemId);
                    return  category;
                })
                .ifPresent(categoryRepository::save);
    }
    private void deleteCategoryItem(String categoryId,String itemId){
        categoryRepository.findById(categoryId)
                .map(category -> {
                    category.getItems().remove(itemId);
                    return  category;
                })
                .ifPresent(categoryRepository::save);
    }
}
