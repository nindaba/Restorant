package com.yadlings.itemservice.Services;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import org.springframework.mock.web.MockMultipartFile;


import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
//todo
//@SpringBootTest
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Log4j2
class CloudStorageServiceTest {

//    @Autowired
    CloudStorageService cloudStorageService;
    @Value("${azure.storage.blob-endpoint}") String endPoint;
    @Value("classpath: /. ") Resource file;
//    @Test
    void fi(@Value("classpath: ./src/test/java/com/yadlings/itemservice/Services/cap.jpeg") Resource file) throws  Exception{
        assertTrue(file.exists());
    }
    MockMultipartFile multipartFile;
    String actualLink;
    //@BeforeAll
    void init() throws Exception{
        multipartFile = new MockMultipartFile(file.getFilename(), file.getInputStream());
        actualLink ="";
    }
    @Order(1)
//    @Test
    void uploadToAzureStorage() throws Exception{
        actualLink = cloudStorageService.uploadToAzureStorage(multipartFile);
        assertTrue(actualLink.startsWith(endPoint));
        assertTrue(actualLink.endsWith(file.getFilename()));
    }
//    @Test
    void list(@Value("${server.allowed.origins}") String origins){
        assertEquals(4, Arrays.asList(origins).size());
    }

    @Order(2)
//    @Test
    void delete(){
        cloudStorageService.delete(actualLink);
    }
}