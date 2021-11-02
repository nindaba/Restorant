package com.yadlings.itemservice.Services;

import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Repositories.CategoryRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.*;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Log4j2
class CategoryServiceTest {
    Category CATEGORY_A;
    Category CATEGORY_B;
    Category CATEGORY_C;
    Category CATEGORY_D;
    @Autowired
    private CategoryService service;
    @Autowired
    private CategoryRepository repository;
    @BeforeAll
    void setUp() {
//        MockitoAnnotations.initMocks(this);
        CATEGORY_A = new Category("1","A","category1", Arrays.asList("1","2","3"),"category one");
        CATEGORY_B = new Category("2","B","category2", Arrays.asList("4","5","6"),"category two");
        CATEGORY_C = new Category("3","C","category3", Arrays.asList("7","8","9"),"category three");
        CATEGORY_D = new Category("4","D","category4", Arrays.asList("10","11","12"),"category four");
    }
    @BeforeEach
    void setBefore(){
        //clear the database
        service.deleteCategory();
        //add sample data
        service.saveCategory(CATEGORY_A);
        service.saveCategory(CATEGORY_B);
        service.saveCategory(CATEGORY_C);
        ResponseEntity<List<Category>> category = service.getCategory();
        category.hasBody();
    }
    @AfterAll
    void setAfter(){
        service.deleteCategory();
    }
    @Test
    void saveCategory(){
        ResponseEntity<HttpHeaders> response = service.saveCategory(CATEGORY_D);
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(
                response.getHeaders().getLocation().getPath(),
                "/"+CATEGORY_D.getId());
        /**
         * This will must fail since category c already xist
         */
        HttpStatus statusCode = service.saveCategory(CATEGORY_C).getStatusCode();
        assertEquals(statusCode,HttpStatus.CONFLICT);
    }
//    @Test
//    void getCategory(){
//        ResponseEntity<List<Category>> category = service.getCategory();
//        assertEquals(category.getStatusCode(),HttpStatus.OK);
//        assertTrue(category.getBody().size() == 3);
//
//    }
//    @Test
//    void getCategoryById(){
//        ResponseEntity<Category> category_A = service.getCategory("1");
//        ResponseEntity<Category> not_category = service.getCategory("5");
//        assertEquals(category_A.getBody(),CATEGORY_A);
//        /**
//         * This will must fail since no id 5 is saved
//         */
//        assertEquals(not_category.getStatusCode(),HttpStatus.NOT_FOUND);
//    }
    @Test
    void deleteCategoryById(){
        HttpStatus statusCode = service.deleteCategory(CATEGORY_A.getId()).getStatusCode();
        assertEquals(statusCode,HttpStatus.OK);
        /**
         * this should fail as the id does not exist
         */
        HttpStatus notExist = service.deleteCategory("5").getStatusCode();
        assertEquals(notExist,HttpStatus.NOT_FOUND);
    }
    @Test
    void deleteCategory(){
        HttpStatus statusCode = service.deleteCategory().getStatusCode();
        assertEquals(statusCode,HttpStatus.OK);
    }
    @Test
    void putCategory(){
        ResponseEntity<Category> responseEntity = service.putCategory("1", CATEGORY_B);
        HttpStatus statusCode = responseEntity.getStatusCode();
        assertEquals(statusCode,HttpStatus.OK);
        ResponseEntity<Category> category = service.getCategory("1");
        assertEquals(category.getBody(),CATEGORY_B);
        assertEquals(category.getStatusCode(),HttpStatus.OK);
        /**
         * Once The Category does not Exist
         */
        responseEntity = service.putCategory("5", CATEGORY_B);
        statusCode = responseEntity.getStatusCode();
        assertEquals(statusCode,HttpStatus.NOT_FOUND);
    }
}