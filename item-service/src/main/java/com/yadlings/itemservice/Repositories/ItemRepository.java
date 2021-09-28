package com.yadlings.itemservice.Repositories;

import com.yadlings.itemservice.Documents.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.nio.channels.FileChannel;
import java.util.Optional;

@Repository
public interface ItemRepository extends MongoRepository<Item,String> {
    Optional<Item> findByName(String name);
}
