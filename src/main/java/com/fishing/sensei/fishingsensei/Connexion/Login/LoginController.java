package com.fishing.sensei.fishingsensei.Connexion.Login;

import com.fishing.sensei.fishingsensei.Connexion.Login.Dto.AUserLoginBaseFormData;
import com.fishing.sensei.fishingsensei.Connexion.Login.Dto.UserLoginFormData;
import com.fishing.sensei.fishingsensei.Connexion.Login.Dto.UserRegisterFormData;
import com.fishing.sensei.fishingsensei.Connexion.Login.Dto.UserRegisterFormResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class LoginController {

    @PostMapping("/login")
    public String login(@RequestBody AUserLoginBaseFormData loginData) {
        if (Objects.equals(loginData.type, "Login")) {

            return loginData.email;
        } else if (loginData instanceof UserRegisterFormData) {
            return "register";
        }
        return "Unknown";
    }
}
