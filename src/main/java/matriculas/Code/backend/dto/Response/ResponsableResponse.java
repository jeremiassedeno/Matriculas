package matriculas.Code.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsableResponse {

    private Long idResponsable;

    private String dni;

    private String nombre;

    private String apellido;

    private String telefono;

    private String ocupacionProfesion;

    private String nacionalidad;
}