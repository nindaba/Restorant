package com.yadlings.itemservice.Documents;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.json.JsonMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
@Log4j2
public class Category {
    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private String image;
    private List<String> items = new ArrayList();
    private String Description;

    public static Category deserialize(String categoryJson) throws Exception{
        return new ObjectMapper().readValue(categoryJson,Category.class);
    }
}
