package matriculas.Code.backend.Service;


import java.util.List;

import matriculas.Code.backend.dto.Request.MatriculaRequest;
import matriculas.Code.backend.dto.Response.MatriculaResponse;

public interface MatriculaService {

    public MatriculaResponse crear(MatriculaRequest request);

    public List<MatriculaResponse> listarTodas();

    public MatriculaResponse buscarPorId(Integer nroOrden);

    public MatriculaResponse actualizar(Integer nroOrden, MatriculaRequest request);

    public void eliminar(Integer nroOrden);






    
}
