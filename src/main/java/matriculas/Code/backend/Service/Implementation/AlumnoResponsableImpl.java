package matriculas.Code.backend.Service.Implementation;

import org.springframework.stereotype.Service;

import matriculas.Code.backend.Model.Alumno;
import matriculas.Code.backend.Model.AlumnoResponsable;
import matriculas.Code.backend.Model.Responsable;
import matriculas.Code.backend.Repository.AlumnoRepository;
import matriculas.Code.backend.Repository.AlumnoResponsableRepository;
import matriculas.Code.backend.Repository.ResponsableRepository;
import matriculas.Code.backend.dto.Projection.VinculoListadoProjection;
import matriculas.Code.backend.dto.Request.AlumnoResponsableRequest;
import matriculas.Code.backend.dto.Response.AlumnoResponsableResponse;
import matriculas.Code.backend.dto.Response.VinculoListadoResponse;

import java.util.List;

@Service
public class AlumnoResponsableImpl implements matriculas.Code.backend.Service.AlumnoResponsableService {

    private final AlumnoResponsableRepository alumnoResponsableRepository;
    private final AlumnoRepository alumnoRepository;
    private final ResponsableRepository responsableRepository;

    public AlumnoResponsableImpl(
            AlumnoResponsableRepository alumnoResponsableRepository,
            AlumnoRepository alumnoRepository,
            ResponsableRepository responsableRepository
    ) {
        this.alumnoResponsableRepository = alumnoResponsableRepository;
        this.alumnoRepository = alumnoRepository;
        this.responsableRepository = responsableRepository;
    }

    public AlumnoResponsableResponse vincular(AlumnoResponsableRequest request) {
        Alumno alumno = alumnoRepository.findById(request.getIdAlumno())
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        Responsable responsable = responsableRepository.findById(request.getIdResponsable())
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));

        alumnoResponsableRepository
                .buscarPorAlumnoYResponsable(
                        request.getIdAlumno(),
                        request.getIdResponsable()
                )
                .ifPresent(relacion -> {
                    throw new RuntimeException("Ese responsable ya está vinculado a ese alumno");
                });

        AlumnoResponsable alumnoResponsable = new AlumnoResponsable();

        alumnoResponsable.setAlumno(alumno);
        alumnoResponsable.setResponsable(responsable);
        alumnoResponsable.setVinculo(request.getVinculo());
        

        AlumnoResponsable guardado = alumnoResponsableRepository.save(alumnoResponsable);
        
        return convertirAResponse(guardado);
    }

    public List<AlumnoResponsableResponse> buscarPorAlumno(Long idAlumno) {
        return alumnoResponsableRepository.buscarPorAlumno(idAlumno)
                .stream()
                .map(this::convertirAResponse)
                .toList();
    }

    public void eliminarVinculo(Long idAlumnoResponsable) {
        AlumnoResponsable relacion = alumnoResponsableRepository.findById(idAlumnoResponsable)
                .orElseThrow(() -> new RuntimeException("Relación alumno-responsable no encontrada"));

        alumnoResponsableRepository.delete(relacion);
    }

    private AlumnoResponsableResponse convertirAResponse(AlumnoResponsable ar) {
        return new AlumnoResponsableResponse(
                ar.getIdAlumnoResponsable(),
                ar.getAlumno().getIdAlumno(),
                ar.getAlumno().getNombre(),
                ar.getAlumno().getApellido(),
                ar.getResponsable().getId(),
                ar.getResponsable().getNombre(),
                ar.getResponsable().getApellido(),
                ar.getResponsable().getDni(),
                ar.getResponsable().getTelefono(),
                ar.getVinculo()
                
        );
    }

    public List<VinculoListadoResponse> buscarVinculos(String buscar) {
    String filtro = buscar;

    if (filtro != null && filtro.isBlank()) {
        filtro = null;
    }

    return alumnoResponsableRepository.buscarVinculos(filtro)
            .stream()
            .map(this::convertirAVinculoListadoResponse)
            .toList();
}

private VinculoListadoResponse convertirAVinculoListadoResponse(VinculoListadoProjection p) {
    return new VinculoListadoResponse(
            p.getIdAlumno(),
            p.getNombreAlumno(),
            p.getApellidoAlumno(),
            p.getDniAlumno(),

            p.getIdResponsable(),
            p.getNombreResponsable(),
            p.getApellidoResponsable(),
            p.getDniResponsable(),
            p.getTelefonoResponsable(),

            p.getIdAlumnoResponsable(),
            p.getVinculo(),

            p.getNroOrden(),
            p.getSeccion(),
            p.getCicloLectivo(),
            p.getEstado()
    );
}

    
}