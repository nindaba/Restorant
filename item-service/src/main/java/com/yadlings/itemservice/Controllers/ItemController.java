package com.yadlings.itemservice.Controllers;

import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Documents.Item;
import com.yadlings.itemservice.Models.PostPutRequest;
import com.yadlings.itemservice.Services.CloudStorageService;
import com.yadlings.itemservice.Services.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

@RestController
@RequestMapping("/item-service/item")
@AllArgsConstructor
public class ItemController {
    private ItemService itemService;
    private CloudStorageService cloudStorageService;

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable String id){
        return itemService.getItem(id);
    }
    @DeleteMapping
    public ResponseEntity<?> deleteItem(@PathVariable String id){
        return itemService.deleteItem(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> putItem(@PathVariable String id,@RequestBody PostPutRequest<Item> request) throws  Exception{
        var item = request.getT();
        //upload the image to azure and get the link in the item image
        MultipartFile image = request.getImage();
//todo      if(image.getContentType() != null && == image) throw new Exception("Content-Type Not supported");
        if(!image.isEmpty()) item.getImages().add(0,cloudStorageService.uploadToAzureStorage(image));
        return itemService.saveItem(id,item);
    }
    @PostMapping
    public ResponseEntity<HttpHeaders> saveItem(@RequestBody PostPutRequest<Item> request) throws  Exception{
        var item = request.getT();
        //upload the image to azure and get the link in the item image
        MultipartFile image = request.getImage();
        if(image.isEmpty()) throw new Exception("Image can not be empty");
// todo       if(image.getContentType() != != null && == image) throw new Exception("Content-Type Not supported");
        item.getImages().add(0,cloudStorageService.uploadToAzureStorage(image));
        return itemService.saveItem(item);
    }

}
