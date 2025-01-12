package com.fishing.sensei.fishingsensei.Entity.User.Document;

import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.UserRegisterFormData;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {

    @Id
    private String _id;

    private String _firstName;
    private String _lastName;

    private String _email;

    private String _password;


    public User(UserRegisterFormData formData) {

        super();

        this._firstName = formData.firstName;
        this._lastName = formData.lastName;
        this._password = formData.password;
        this._email = formData.email;
    }
}
