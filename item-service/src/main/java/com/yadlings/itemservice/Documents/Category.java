package com.yadlings.itemservice.Documents;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Category {
    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private String image;
    private List<String> items;
    private String Description;
}
