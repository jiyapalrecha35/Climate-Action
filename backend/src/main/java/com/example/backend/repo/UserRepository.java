package com.example.backend.repo;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}