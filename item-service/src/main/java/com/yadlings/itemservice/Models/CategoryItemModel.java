package com.yadlings.itemservice.Models;

import com.yadlings.itemservice.Documents.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryItemModel {
    private String id;
    private String name;
    private String image;
    private List<Item> items;
    private String Description;
    public static class CategoryItemModelBuilder{
        CategoryItemModel categoryItemModel = new CategoryItemModel();
        public CategoryItemModel build(){
            return this.categoryItemModel;
        }
        public CategoryItemModelBuilder setId(String id){
            categoryItemModel.setId(id);
            return this;
        }
        public CategoryItemModelBuilder setName(String name){
            categoryItemModel.setName(name);
            return this;
        }
        public CategoryItemModelBuilder setImage(String image){
            categoryItemModel.setImage(image);
            return this;
        }
        public CategoryItemModelBuilder setItems(List<Item> items){
            categoryItemModel.setItems(items);
            return this;
        }
        public CategoryItemModelBuilder setDescription(String description){
            categoryItemModel.setDescription(description);
            return this;
        }
    }
}
