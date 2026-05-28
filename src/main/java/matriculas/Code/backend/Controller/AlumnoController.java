package matriculas.Code.backend.Controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import matriculas.Code.backend.Service.AlumnoService;
import matriculas.Code.backend.dto.Request.AlumnoRequest;
import matriculas.Code.backend.dto.Response.AlumnoResponse;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "*")
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping
    public List<AlumnoResponse> listarTodos() {
        return alumnoService.listarTodos();
    }

    @GetMapping("/{id}")
    public AlumnoResponse buscarPorId(@PathVariable Long id) {
        return alumnoService.buscarPorId(id);
    }

    @PostMapping
    public AlumnoResponse crear(@Valid @RequestBody AlumnoRequest request) {
        return alumnoService.crear(request);
    }

    @PutMapping("/{id}")
    public AlumnoResponse actualizar(
            @PathVariable Long id,
            @RequestBody AlumnoRequest request
    ) {
        return alumnoService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        alumnoService.eliminar(id);
    }
}