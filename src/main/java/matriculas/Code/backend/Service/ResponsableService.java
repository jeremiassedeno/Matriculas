package matriculas.Code.backend.Service;

import java.util.List;

import matriculas.Code.backend.dto.Request.ResponsableRequest;
import matriculas.Code.backend.dto.Response.ResponsableResponse;

public interface ResponsableService {
    
    public List<ResponsableResponse> listarTodos();

    public ResponsableResponse buscarPorId(Long id);

    public ResponsableResponse crear(ResponsableRequest request);

    public ResponsableResponse actualizar(Long id, ResponsableRequest request);

    public void eliminar(Long id);
    

}
