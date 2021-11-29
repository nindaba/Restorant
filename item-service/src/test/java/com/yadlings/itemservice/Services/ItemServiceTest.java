package com.yadlings.itemservice.Services;

import com.yadlings.itemservice.Documents.Item;
import com.yadlings.itemservice.Repositories.CategoryRepository;
import com.yadlings.itemservice.Repositories.ItemRepository;
import com.yadlings.itemservice.TestData;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import static com.yadlings.itemservice.TestData.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.*;
@Log4j2
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ItemServiceTest {
    ItemRepository itemRepository;
    CategoryRepository categoryRepository;
    ItemService itemService;
    @BeforeAll
    void setUp() {
        itemRepository = mock(ItemRepository.class);
        categoryRepository  = mock(CategoryRepository.class);
        itemService = new ItemService(itemRepository,categoryRepository);

        TestData.CATEGORY_B.getItems().add("2");
        TestData.CATEGORY_A.getItems().add("1");
        TestData.CATEGORY_A.getItems().add("2");

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRequestURI(REQUEST_END_POINT);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
    }

    @Test
    void getItem() {
        /**
         * the service is trying to fetch all the items in the database
         * instead there are methords in the category which will do that work
         * where each category will be fetched with its own Items
         */
        when(itemRepository.findById(ITEM_A.getId())).thenReturn(Optional.of(ITEM_A));
        ResponseEntity<Item> actual = itemService.getItem(ITEM_A.getId());

        assertEquals(OK_STATUS,actual.getStatusCode());
        assertEquals(ITEM_A,actual.getBody());
        /**
         * It Should fail
         */
        when(itemRepository.findById(ITEM_A.getId())).thenReturn(Optional.empty());
        actual = itemService.getItem(ITEM_A.getId());
        assertNotEquals(OK_STATUS,actual.getStatusCode());
        assertNotEquals(ITEM_A,actual.getBody());
    }

    @Test
    void saveItem() {
        /**
         * The service is trying to save one item will first check if the name is taken and if not
         * It will also check if the category you are trying to relate is available
         * The repository must return the saved item as some properties may be changed by the db such as id
         * the service will try to look for a category with Id == Item.category and
         * change it by adding the item.id in the category
         */
        when(itemRepository.findByName(ITEM_A.getName())).thenReturn(Optional.empty());
        when(itemRepository.save(ITEM_A)).thenReturn(ITEM_A);
        when(categoryRepository.findById(ITEM_A.getCategory())).thenReturn(Optional.of(TestData.CATEGORY_A));
        doReturn(TestData.CATEGORY_A)
                .when(categoryRepository)
                .save(TestData.CATEGORY_A);
        ResponseEntity<HttpHeaders> actual = itemService.saveItem(ITEM_A);
        assertEquals(OK_STATUS,actual.getStatusCode());
        /**
         * Fail case by already existing name
         */
        when(itemRepository.findByName(ITEM_A.getName())).thenReturn(Optional.of(ITEM_A));
        actual = itemService.saveItem(ITEM_A);
        assertNotEquals(OK_STATUS,actual.getStatusCode());
        /**
         * Fail case by no such category
         */
        when(itemRepository.findByName(ITEM_A.getName())).thenReturn(Optional.empty());
        when(categoryRepository.findById(ITEM_A.getCategory())).thenReturn(Optional.empty());
        actual = itemService.saveItem(ITEM_A);
        assertNotEquals(OK_STATUS,actual.getStatusCode());
    }

    @Test
    void deleteItem() {
        /**
         * the service is trying to delete an item
         * Note that the Item Id is also present in the category therefore we need to see if the service
         * will make some calls in the category repo
         */
        when(itemRepository.findById(ITEM_A.getId())).thenReturn(Optional.of(ITEM_A));
        doNothing().when(itemRepository).deleteById(ITEM_A.getId());
        when(categoryRepository.findById(ITEM_A.getCategory())).thenReturn(Optional.of(TestData.CATEGORY_A));
        /**
         * when modifying category it will remove the Item.Id == 1 this means that
         * the length of items decreases by 1
         */
        ResponseEntity<?> actual = itemService.deleteItem(ITEM_A.getId());
        assertEquals(OK_STATUS,actual.getStatusCode());
        /**
         * this will as they will be no ItemA Id
         */
        when(itemRepository.findById(ITEM_A.getId())).thenReturn(Optional.empty());
        actual = itemService.deleteItem(ITEM_A.getId());
        assertNotEquals(OK_STATUS,actual.getStatusCode());

        /** It was Suppose to delete twice but it deleted once because it did not finde the item to delete*/
        verify(itemRepository,times(1)).deleteById(ITEM_A.getId());
    }
    @Test
    void saveItemById(){ //usually it is used when updating
        /** This is the update of a
         * and this will not alter the category as the id will stay the same
         */
        when(itemRepository.save(ITEM_B)).thenReturn(ITEM_B);
        when(itemRepository.findById(ITEM_A.getId())).thenReturn(Optional.of(ITEM_A));
        ResponseEntity<?> actual = itemService.saveItem(ITEM_A.getId(),ITEM_B);
        assertEquals(OK_STATUS,actual.getStatusCode());
        /**
         * but it can fail to find the original id ,which will make the request fail
         */
        when(itemRepository.findById(ITEM_A.getId())).thenReturn(Optional.empty());
        actual = itemService.saveItem(ITEM_A.getId(),ITEM_B);
        assertNotEquals(OK_STATUS,actual.getStatusCode());
    }
}