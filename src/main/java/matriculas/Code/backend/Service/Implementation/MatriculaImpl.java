package matriculas.Code.backend.Service.Implementation;

import org.springframework.stereotype.Service;

import matriculas.Code.backend.Model.Alumno;
import matriculas.Code.backend.Model.EstadoMatricula;
import matriculas.Code.backend.Model.Matricula;
import matriculas.Code.backend.Repository.AlumnoRepository;
import matriculas.Code.backend.Repository.MatriculaRepository;
import matriculas.Code.backend.dto.Request.MatriculaRequest;
import matriculas.Code.backend.dto.Response.MatriculaResponse;

import java.util.List;

@Service
public class MatriculaImpl implements matriculas.Code.backend.Service.MatriculaService{

    private final MatriculaRepository matriculaRepository;
    private final AlumnoRepository alumnoRepository;

    public MatriculaImpl(
            MatriculaRepository matriculaRepository,
            AlumnoRepository alumnoRepository
    ) {
        this.matriculaRepository = matriculaRepository;
        this.alumnoRepository = alumnoRepository;
    }

    public List<MatriculaResponse> listarTodas() {
        return matriculaRepository.findAll()
                .stream()
                .map(this::convertirAResponse)
                .toList();
    }

    public MatriculaResponse buscarPorId(Integer id) {
        Matricula matricula = matriculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matrícula no encontrada"));

        return convertirAResponse(matricula);
    }

    public MatriculaResponse crear(MatriculaRequest request) {
        Alumno alumno = alumnoRepository.findById(request.getIdAlumno())
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        Matricula matricula = new Matricula();

        
        matricula.setAlumno(alumno);
        matricula.setSeccion(request.getSeccion());
        matricula.setCicloLectivo(request.getCicloLectivo());
        matricula.setFechaEntrada(request.getFechaEntrada());
        matricula.setFechaSalida(request.getFechaSalida());
        matricula.setEstado(
                request.getEstado() != null ? request.getEstado() : EstadoMatricula.ACTIVO
        );
        matricula.setObservaciones(request.getObservaciones());

        Matricula guardada = matriculaRepository.save(matricula);

        return convertirAResponse(guardada);
    }

    @Override
public MatriculaResponse actualizar(Integer nroOrden, MatriculaRequest request) {
    Matricula matricula = matriculaRepository.findById(nroOrden)
            .orElseThrow(() -> new RuntimeException("Matrícula no encontrada"));

    Alumno alumno = alumnoRepository.findById(request.getIdAlumno())
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

    // IMPORTANTE:
    // No modificar nroOrden porque es la clave primaria.
    // matricula.setNroOrden(request.getNroOrden());  <-- NO

    matricula.setAlumno(alumno);
    matricula.setSeccion(request.getSeccion());
    matricula.setCicloLectivo(request.getCicloLectivo());
    matricula.setFechaEntrada(request.getFechaEntrada());
    matricula.setFechaSalida(request.getFechaSalida());
    matricula.setEstado(request.getEstado());
    matricula.setObservaciones(request.getObservaciones());

    Matricula guardada = matriculaRepository.save(matricula);

    return convertirAResponse(guardada);
}

    public void eliminar(Integer id) {
        Matricula matricula = matriculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matrícula no encontrada"));

        matriculaRepository.delete(matricula);
    }

    private MatriculaResponse convertirAResponse(Matricula matricula) {
        return new MatriculaResponse(

                matricula.getNroOrden(),
                matricula.getAlumno().getIdAlumno(),
                matricula.getAlumno().getNombre(),
                matricula.getAlumno().getApellido(),
                matricula.getAlumno().getDni(),
                matricula.getSeccion(),
                matricula.getCicloLectivo(),
                matricula.getFechaEntrada(),
                matricula.getFechaSalida(),
                matricula.getEstado(),
                matricula.getObservaciones() 
        );
    }

   
}
