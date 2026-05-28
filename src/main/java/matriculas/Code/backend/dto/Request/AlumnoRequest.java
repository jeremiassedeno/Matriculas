package matriculas.Code.backend.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoRequest {

    @NotBlank
    private String dni;

    private String nombre;

    private String apellido;

    private LocalDate fechaNacimiento;

    private String nacionalidad;

    private String direccion;

    private Boolean activo;
}