package com.yadlings.itemservice.Services;

import com.yadlings.itemservice.Documents.Category;
import com.yadlings.itemservice.Models.CategoryItemModel;
import com.yadlings.itemservice.Repositories.CategoryRepository;
import com.yadlings.itemservice.Repositories.ItemRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.yadlings.itemservice.TestData.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Log4j2
class CategoryServiceTest {
    private CategoryService service;
    private CategoryRepository repository;
    private ItemRepository itemRepository;
	private ItemService itemService;
    @BeforeAll
    void setUp() {
        repository = mock(CategoryRepository.class);
        itemRepository = mock(ItemRepository.class);
        service = new CategoryService(repository,itemRepository);
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRequestURI(REQUEST_END_POINT);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
    }
    @Test
    void saveCategory(){
        when(repository.save(CATEGORY_D)).thenReturn(CATEGORY_D);
        when(repository.findByName(CATEGORY_D.getName())).thenReturn(Optional.empty());
        ResponseEntity<HttpHeaders> response = service.saveCategory(CATEGORY_D);
        assertEquals(HttpStatus.OK,response.getStatusCode());
//        assertEquals(response.getHeaders().getLocation().getPath(),"/"+REQUEST_END_POINT+"/null"); //todo create category d with null and category d with id// because the service sets the id to null before saving it. this means that it is nolonger saving a chategory == d
       
        /**This will must fail since category c already exist */
        when(repository.findByName(CATEGORY_C.getName())).thenReturn(Optional.of(CATEGORY_C));
        HttpStatus statusCode = service.saveCategory(CATEGORY_C).getStatusCode();
        assertEquals(HttpStatus.CONFLICT,statusCode);
    }
    @Test
    void getCategory(){
        when(repository.findAll()).thenReturn(Arrays.asList(CATEGORY_A,CATEGORY_B,CATEGORY_C));
        ResponseEntity<List<Category>> category = service.getCategory();
        assertEquals(HttpStatus.OK,category.getStatusCode());
        assertTrue(category.getBody().size() == 3);

    }
    @Test
    void getCategoryById(){
        when(repository.findById(CATEGORY_A.getId())).thenReturn(Optional.of(CATEGORY_A));
        ResponseEntity<Category> actual = service.getCategory(CATEGORY_A.getId());
        assertEquals(CATEGORY_A,actual.getBody());
        assertEquals(OK_STATUS,actual.getStatusCode());

        /**This will must fail since no id 5 is saved */
        when(repository.findById(CATEGORY_A.getId())).thenReturn(Optional.empty());
        actual = service.getCategory(CATEGORY_A.getId());
        assertNotEquals(actual.getBody(),CATEGORY_A);
        assertEquals(HttpStatus.NOT_FOUND,actual.getStatusCode());
    }
    @Test
    void deleteCategoryById(){
        doNothing().when(repository).deleteById(CATEGORY_D.getId());
        when(repository.findById(CATEGORY_D.getId())).thenReturn(Optional.of(CATEGORY_D));
        HttpStatus actual = service.deleteCategory(CATEGORY_D.getId()).getStatusCode();
        assertEquals(OK_STATUS,actual);
        /**
         * this should fail as the id does not exist
         */
        when(repository.findById(CATEGORY_D.getId())).thenReturn(Optional.empty());
        HttpStatus notExist = service.deleteCategory(CATEGORY_D.getId()).getStatusCode();
        assertEquals(HttpStatus.NOT_FOUND,notExist);
    }
    @Test
    void deleteCategory(){
        doNothing().when(repository).deleteAll();
        HttpStatus statusCode = service.deleteCategory().getStatusCode();
        assertEquals(statusCode,HttpStatus.OK);
    }
    @Test
    void putCategory(){
        /**Suppose that in the database we have category A */
        when(repository.findById(CATEGORY_A.getId())).thenReturn(Optional.of(CATEGORY_A));
        /**
         * Note that in the test data Category B is an update of A
         * meaning that it has Id of A
         * so we should save B as an update of A
         */
        when(repository.save(CATEGORY_B)).thenReturn(CATEGORY_B);

        ResponseEntity<Category> actual = service.putCategory(CATEGORY_A.getId(), CATEGORY_B);
        assertEquals(HttpStatus.OK,actual.getStatusCode());
        /** Check if the value is updated */
        actual = service.getCategory(CATEGORY_A.getId());
        assertEquals(CATEGORY_B,actual.getBody());
        assertEquals(HttpStatus.OK,actual.getStatusCode());
        /**
         * Once The Category does not Exist
         * this means that i have to return an empty optional
         * which will make the update fail
         */
        doReturn(Optional.empty()).when(repository).findById(NON_EXISTING_CATEGORY_ID);
        actual = service.putCategory(NON_EXISTING_CATEGORY_ID, CATEGORY_B);
        assertEquals(HttpStatus.NOT_FOUND,actual.getStatusCode());
    }

//todo
//    @Test
    void getCategoryItem() {
        /**
         * Note That I am returning a List of size 1
         */
        when(repository.findAll()).thenReturn(Arrays.asList(CATEGORY_D)); /** Category c is the one with item 1 and 2 Ids listed in its items */
        doReturn(Optional.of(ITEM_A)).when(itemRepository).findById(ITEM_A.getId());
        doReturn(Optional.of(ITEM_B)).when(itemRepository).findById(ITEM_A.getId().replace("1","2")); /** Replace Id 1 with 2 is because in the TestData they have same id since one B is an update of A */
        ResponseEntity<List<CategoryItemModel>> actual = service.getCategoryItem();
        assertEquals(1,actual.getBody().size());
        assertEquals(EXPECTED_CATEGORY_ITEM.getItems(),actual.getBody().get(0).getItems());
        assertEquals(OK_STATUS,actual.getStatusCode());
    }

//todo    @Test
    void testGetCategoryItem() {
        when(repository.findById(CATEGORY_D.getId())).thenReturn(Optional.of(CATEGORY_D)); /** Category c is the one with item 1 and 2 Ids listed in its items */
        when(itemRepository.findById(ITEM_A.getId())).thenReturn(Optional.of(ITEM_A));
        when(itemRepository.findById(ITEM_B.getId().replace("1","2"))).thenReturn(Optional.of(ITEM_B)); /** Replace Id 1 with 2 is because in the TestData they have same id since one B is an update of A */
        ResponseEntity<CategoryItemModel> actual = service.getCategoryItem(CATEGORY_D.getId());
        assertEquals(EXPECTED_CATEGORY_ITEM,actual.getBody());
        assertEquals(OK_STATUS,actual.getStatusCode());
    }
}
