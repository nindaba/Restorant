package com.yadlings.itemservice;

import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Documents.Item;
import com.yadlings.itemservice.Models.CategoryItemModel;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Arrays;

public class TestData {

    public final static Category CATEGORY_A = new Category("1","A","category1", new ArrayList<>(),"category one");
    /** This is can also be used as an update of A that is why i am setting the Id to 1*/
    public final static Category CATEGORY_B = new Category("1","A","category1", new ArrayList<>(),"category one");
    public final static Category CATEGORY_C = new Category("3","C","category3", Arrays.asList("1","2"),"category three");
    public final static Category CATEGORY_D = new Category("4","D","category4", Arrays.asList("10","11","12"),"category four");


    public final static String NON_EXISTING_CATEGORY_ID = "5";
    public final static String NO_EXISTING_ITEM_ID = "10";
    public final static HttpStatus OK_STATUS = HttpStatus.OK;

    public final static Item ITEM_A = new Item("1","capucino",new ArrayList(),"1",0.3,"tasty");
    /** This is can also be used as an update of A that is why i am setting the Id to 1 */
    public final static Item ITEM_B = new Item("1","mexcan-coffe",new ArrayList(),"2",1.3,"hard");

    public final static CategoryItemModel EXPECTED_CATEGORY_ITEM = new CategoryItemModel("4","D","category4", Arrays.asList(ITEM_A,ITEM_B),"category four");

    public final static String REQUEST_END_POINT = "item-service";

}
