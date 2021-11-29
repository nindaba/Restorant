package com.yadlings.itemservice.Models;

import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Documents.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
@AllArgsConstructor
@Data
public class PostPutRequest <T>{
    T t;
    MultipartFile image;
}
