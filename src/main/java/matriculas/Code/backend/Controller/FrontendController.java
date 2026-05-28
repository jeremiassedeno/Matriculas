package matriculas.Code.backend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping(value = {
            "/",
            "/login",
            "/alumnos",
            "/responsables",
            "/matriculas",
            "/vinculos",
            "/alumno-responsable"
    })
    public String forward() {
        return "forward:/index.html";
    }
}