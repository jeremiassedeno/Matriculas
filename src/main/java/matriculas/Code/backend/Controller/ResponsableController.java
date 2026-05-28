package matriculas.Code.backend.Controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import matriculas.Code.backend.Service.ResponsableService;
import matriculas.Code.backend.dto.Request.ResponsableRequest;
import matriculas.Code.backend.dto.Response.ResponsableResponse;

import java.util.List;

@RestController
@RequestMapping("/api/responsables")
@CrossOrigin(origins = "*")
public class ResponsableController {

    private final ResponsableService responsableService;

    public ResponsableController(ResponsableService responsableService) {
        this.responsableService = responsableService;
    }

    @GetMapping
    public List<ResponsableResponse> listarTodos() {
        return responsableService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponsableResponse buscarPorId(@PathVariable Long id) {
        return responsableService.buscarPorId(id);
    }

    @PostMapping
    public ResponsableResponse crear(@Valid @RequestBody ResponsableRequest request) {
        return responsableService.crear(request);
    }

    @PutMapping("/{id}")
    public ResponsableResponse actualizar(
            @PathVariable Long id,
            @RequestBody ResponsableRequest request
    ) {
        return responsableService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        responsableService.eliminar(id);
    }
}