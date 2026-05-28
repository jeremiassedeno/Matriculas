package matriculas.Code.backend.Service.Implementation;

import org.springframework.stereotype.Service;

import matriculas.Code.backend.Model.Alumno;
import matriculas.Code.backend.Repository.AlumnoRepository;
import matriculas.Code.backend.dto.Request.AlumnoRequest;
import matriculas.Code.backend.dto.Response.AlumnoResponse;

import java.util.List;

@Service
public class AlumnoImpl implements matriculas.Code.backend.Service.AlumnoService {

    private final AlumnoRepository alumnoRepository;

    public AlumnoImpl(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    public List<AlumnoResponse> listarTodos() {
        return alumnoRepository.findAll()
                .stream()
                .map(this::convertirAResponse)
                .toList();
    }

    public AlumnoResponse buscarPorId(Long id) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        return convertirAResponse(alumno);
    }

    public AlumnoResponse crear(AlumnoRequest request) {
        Alumno alumno = new Alumno();

        alumno.setDni(request.getDni());
        alumno.setNombre(request.getNombre());
        alumno.setApellido(request.getApellido());
        alumno.setFechaNacimiento(request.getFechaNacimiento());
        alumno.setNacionalidad(request.getNacionalidad());
        alumno.setDireccion(request.getDireccion());
        alumno.setActivo(request.getActivo() != null ? request.getActivo() : true);

        Alumno alumnoGuardado = alumnoRepository.save(alumno);

        return convertirAResponse(alumnoGuardado);
    }

    public AlumnoResponse actualizar(Long id, AlumnoRequest request) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        alumno.setDni(request.getDni());
        alumno.setNombre(request.getNombre());
        alumno.setApellido(request.getApellido());
        alumno.setFechaNacimiento(request.getFechaNacimiento());
        alumno.setNacionalidad(request.getNacionalidad());
        alumno.setDireccion(request.getDireccion());

        if (request.getActivo() != null) {
            alumno.setActivo(request.getActivo());
        }

        Alumno alumnoActualizado = alumnoRepository.save(alumno);

        return convertirAResponse(alumnoActualizado);
    }

    public void eliminar(Long id) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        alumnoRepository.delete(alumno);
    }

    private AlumnoResponse convertirAResponse(Alumno alumno) {
        return new AlumnoResponse(
                alumno.getIdAlumno(),
                alumno.getDni(),
                alumno.getNombre(),
                alumno.getApellido(),
                alumno.getFechaNacimiento(),
                alumno.getNacionalidad(),
                alumno.getDireccion(),
                alumno.isActivo()
        );
    }
}