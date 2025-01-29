package com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AUserLoginBaseFormData implements IUserLoginBaseFormData {

    public String type;

    @Email(message = "Wrong email format")
    @NotBlank(message = "Missing email field")
    public String email;

    @NotBlank(message = "Missing password field")
    public String password;
}
