package com.yadlings.itemservice.Services;

import com.yadlings.itemservice.Documents.Item;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

public interface ItemServiceInterface {
    ResponseEntity<Item> getItem(String id);
    ResponseEntity<?> saveItem(String id, Item item);
    ResponseEntity<?> deleteItem(String id);
    ResponseEntity<HttpHeaders> saveItem(Item item);
}
