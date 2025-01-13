package com.fishing.sensei.fishingsensei.Entity.User;

import com.fishing.sensei.fishingsensei.Entity.User.Document.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
