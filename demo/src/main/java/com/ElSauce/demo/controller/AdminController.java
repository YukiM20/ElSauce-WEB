package com.ElSauce.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class AdminController {

    @GetMapping("/admin")
    public String admin() {
        return "admin"; // templates/admin.html
    }

    @PostMapping("/dashboard")
    public String dashboard(
            @RequestParam String username,
            @RequestParam String password,
            Model model) {

        if ((username.equals("fabian") || username.equals("milagros") 
             || username.equals("alonso") || username.equals("diego"))
             && password.equals("utp")) {

            model.addAttribute("user", username);
            return "dashboard-menu"; // templates/dashboard-menu.html
        }

        model.addAttribute("error", "Usuario o contraseña incorrectos");
        return "admin";
    }
}
