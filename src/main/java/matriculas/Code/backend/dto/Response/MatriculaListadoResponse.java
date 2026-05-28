package matriculas.Code.backend.dto.Response;


import matriculas.Code.backend.Model.EstadoMatricula;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaListadoResponse {

    private Long idMatricula;

    private Integer nroOrden;

    private Long idAlumno;

    private String apellidoAlumno;

    private String nombreAlumno;

    private String dniAlumno;

    private String seccion;

    private Integer cicloLectivo;

    private EstadoMatricula estado;

    private String responsablePrincipal;

    private String telefonoResponsable;
}