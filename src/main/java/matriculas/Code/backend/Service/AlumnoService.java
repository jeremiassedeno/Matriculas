package matriculas.Code.backend.Service;

import matriculas.Code.backend.dto.Request.AlumnoRequest;
import matriculas.Code.backend.dto.Response.AlumnoResponse;

public interface AlumnoService {

    public java.util.List<AlumnoResponse> listarTodos();

    public AlumnoResponse buscarPorId(Long id);

    public AlumnoResponse crear(AlumnoRequest request);

    public AlumnoResponse actualizar(Long id, AlumnoRequest request);

    public void eliminar(Long id);

    
    
}
