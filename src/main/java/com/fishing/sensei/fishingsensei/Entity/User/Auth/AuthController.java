package com.fishing.sensei.fishingsensei.Entity.User.Auth;

import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.UserRegisterFormData;
import com.fishing.sensei.fishingsensei.Entity.User.UserService;
import jakarta.validation.Valid;
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
    public ResponseEntity<String> login(@Valid @RequestBody UserRegisterFormData loginData) {

        if (Objects.equals(loginData.type, "Login")) {

            if (!userService.loginUser(loginData))
                return new ResponseEntity<>("Wrong username or password", HttpStatus.NOT_FOUND);

            return new ResponseEntity<>("Successfully logged in", HttpStatus.OK);
        }

        boolean isValid = userService.registerUser(loginData);

        if (!isValid) return new ResponseEntity<>("User already exist !", HttpStatus.CONFLICT);

        return new ResponseEntity<>("User successfully created !", HttpStatus.CREATED);
    }
}
