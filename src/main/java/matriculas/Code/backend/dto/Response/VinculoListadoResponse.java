package matriculas.Code.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VinculoListadoResponse {

    private Long idAlumno;
    private String nombreAlumno;
    private String apellidoAlumno;
    private String dniAlumno;

    private Long idResponsable;
    private String nombreResponsable;
    private String apellidoResponsable;
    private String dniResponsable;
    private String telefonoResponsable;

    private Long idAlumnoResponsable;
    private String vinculo;

    private Integer nroOrden;
    private String seccion;
    private Integer cicloLectivo;
    private String estado;
}