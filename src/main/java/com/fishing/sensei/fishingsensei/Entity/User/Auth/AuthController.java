package com.fishing.sensei.fishingsensei.Entity.User.Auth;

import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.AUserLoginBaseFormData;
import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.UserRegisterFormData;
import com.fishing.sensei.fishingsensei.Entity.User.Document.User;
import com.fishing.sensei.fishingsensei.Entity.User.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> login(@RequestBody UserRegisterFormData loginData) {

        System.out.println("COucuo");
        if (Objects.equals(loginData.type, "Login")) {

            return null;
        }
        User registeredUser = new User( loginData);

        userService.createUser(registeredUser);

        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
}
