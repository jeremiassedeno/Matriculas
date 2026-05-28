package matriculas.Code.backend.Service;

import java.util.List;

import matriculas.Code.backend.dto.Request.AlumnoResponsableRequest;
import matriculas.Code.backend.dto.Response.AlumnoResponsableResponse;

import matriculas.Code.backend.dto.Response.VinculoListadoResponse;

public interface AlumnoResponsableService {

        public AlumnoResponsableResponse vincular(AlumnoResponsableRequest request);
    
        public List<AlumnoResponsableResponse> buscarPorAlumno(Long idAlumno);

        public void eliminarVinculo(Long idAlumnoResponsable);

        List<VinculoListadoResponse> buscarVinculos(String buscar);
    
}
