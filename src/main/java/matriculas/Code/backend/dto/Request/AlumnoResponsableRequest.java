package matriculas.Code.backend.dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoResponsableRequest {

    @NotNull
    private Long idAlumno;

    @NotNull
    private Long idResponsable;

    @NotBlank
    private String vinculo;

    
}