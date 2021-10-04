package com.yadlings.itemservice.Controllers;

import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Documents.Item;
import com.yadlings.itemservice.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/item-service/item")
//Todo to be configured in security
@CrossOrigin
public class ItemController {
    @Autowired
    private ItemService itemService;
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable String id){
        return itemService.getItem(id);
    }
    @DeleteMapping
    public ResponseEntity<?> deleteItem(@PathVariable String id){
        return itemService.deleteItem(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> putItem(@PathVariable String id,@RequestBody Item item){
        return itemService.saveItem(id,item);
    }
    @PostMapping
    public ResponseEntity<HttpHeaders> saveItem(@RequestBody Item item){
        return itemService.saveItem(item);
    }

}
