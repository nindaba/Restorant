package com.yadlings.itemservice.Controllers;

import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Documents.Item;
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
@RequestMapping("item")
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
    public ResponseEntity<?> putItem(@PathVariable("id") String id,@RequestParam("item") String itemJson,@RequestParam(name="image",required=false) MultipartFile image) throws Exception{
        var item = Item.deserialize(itemJson);
        //upload the image to azure and get the link in the item image
//todo      if(image.getContentType() != null && == image) throw new Exception("Content-Type Not supported");
        if(image != null && !image.isEmpty()) item.setImage(cloudStorageService.uploadToAzureStorage(image));
        return itemService.saveItem(id,item);
    }
    @PostMapping
    public ResponseEntity<HttpHeaders> saveItem(@RequestParam("item") String itemJson,@RequestParam("image") MultipartFile image) throws Exception{
        var item = Item.deserialize(itemJson);
        //upload the image to azure and get the link in the item image
        if(image == null) throw new Exception("Image can not be empty");
// todo       if(image.getContentType() != != null && == image) throw new Exception("Content-Type Not supported");
        item.setImage(cloudStorageService.uploadToAzureStorage(image));
        return itemService.saveItem(item);
    }

}
