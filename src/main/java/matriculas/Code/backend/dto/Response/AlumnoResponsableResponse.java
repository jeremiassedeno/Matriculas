package matriculas.Code.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoResponsableResponse {

    private Long idAlumnoResponsable;

    private Long idAlumno;

    private String nombreAlumno;

    private String apellidoAlumno;

    private Long idResponsable;

    private String nombreResponsable;

    private String apellidoResponsable;

    private String dniResponsable;

    private String telefonoResponsable;

    private String vinculo;

   
}