package matriculas.Code.backend.Controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import matriculas.Code.backend.Service.AlumnoResponsableService;
import matriculas.Code.backend.dto.Request.AlumnoResponsableRequest;
import matriculas.Code.backend.dto.Response.AlumnoResponsableResponse;

import matriculas.Code.backend.dto.Response.VinculoListadoResponse;

import java.util.List;

@RestController
@RequestMapping("/api/alumno-responsable")
@CrossOrigin(origins = "*")
public class AlumnoResponsableController {

    private final AlumnoResponsableService alumnoResponsableService;

    public AlumnoResponsableController(AlumnoResponsableService alumnoResponsableService) {
        this.alumnoResponsableService = alumnoResponsableService;
    }

    @PostMapping
    public AlumnoResponsableResponse vincular(@Valid @RequestBody AlumnoResponsableRequest request) {
        return alumnoResponsableService.vincular(request);
    }

    @GetMapping("/alumno/{idAlumno}")
    public List<AlumnoResponsableResponse> buscarPorAlumno(@PathVariable Long idAlumno) {
        return alumnoResponsableService.buscarPorAlumno(idAlumno);
    }

    @DeleteMapping("/{idAlumnoResponsable}")
    public void eliminarVinculo(@PathVariable Long idAlumnoResponsable) {
        alumnoResponsableService.eliminarVinculo(idAlumnoResponsable);
    }

    @GetMapping("/buscar")
    public List<VinculoListadoResponse> buscarVinculos(
            @RequestParam(required = false) String buscar
    ) {
        return alumnoResponsableService.buscarVinculos(buscar);
    }
}