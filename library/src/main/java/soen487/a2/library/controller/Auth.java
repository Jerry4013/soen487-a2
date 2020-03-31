package soen487.a2.library.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import soen487.a2.library.CommonReturnType;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"*"}, allowCredentials = "true")
public class Auth {

    @Value("${login.username}")
    private String username;

    @Value("${login.password}")
    private String password;

    @PostMapping()
    public CommonReturnType login(@RequestParam("username") String username,
                                  @RequestParam("password") String password) {
        if (this.username.equals(username) && this.password.equals(password)) {
            return CommonReturnType.create(true);
        }
        return CommonReturnType.create(false);
    }
}
