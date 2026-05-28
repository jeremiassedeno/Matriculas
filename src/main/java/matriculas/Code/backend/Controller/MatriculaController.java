package matriculas.Code.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import matriculas.Code.backend.Service.MatriculaService;
import matriculas.Code.backend.dto.Request.MatriculaRequest;
import matriculas.Code.backend.dto.Response.MatriculaResponse;

import java.util.List;

@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin(origins = "*")
public class MatriculaController {

    private final MatriculaService matriculaService;

    public MatriculaController(MatriculaService matriculaService) {
        this.matriculaService = matriculaService;
    }

    @GetMapping
    public List<MatriculaResponse> listarTodas() {
        return matriculaService.listarTodas();
    }

    @GetMapping("/{nroOrden}")
    public MatriculaResponse buscarPorId(@PathVariable Integer nroOrden) {
        return matriculaService.buscarPorId(nroOrden);
    }

    @PostMapping
    public MatriculaResponse crear(@Valid @RequestBody MatriculaRequest request) {
        return matriculaService.crear(request);
    }

    @PutMapping("/{nroOrden}")
public ResponseEntity<MatriculaResponse> actualizar(
        @PathVariable Integer nroOrden,
        @RequestBody MatriculaRequest request
) {
    return ResponseEntity.ok(matriculaService.actualizar(nroOrden, request));
}

    @DeleteMapping("/{nroOrden}")
public ResponseEntity<Void> eliminar(@PathVariable Integer nroOrden) {
    matriculaService.eliminar(nroOrden);
    return ResponseEntity.noContent().build();
}
}
