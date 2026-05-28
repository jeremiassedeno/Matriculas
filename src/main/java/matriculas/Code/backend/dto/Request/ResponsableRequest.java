package matriculas.Code.backend.dto.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsableRequest {

    @NotBlank
    private String dni;

    private String nombre;

    private String apellido;

    private String telefono;

    private String ocupacionProfesion;

    private String nacionalidad;
}