package com.yadlings.itemservice.Documents;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Item {
    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private String image;
    private String category;
    private double price = 0.0;
    private String Description;
    public static Item deserialize(String itemJson) throws Exception{
        return new ObjectMapper().readValue(itemJson,Item.class);
    }
}
