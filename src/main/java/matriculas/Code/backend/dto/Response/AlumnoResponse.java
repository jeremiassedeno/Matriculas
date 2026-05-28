package matriculas.Code.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoResponse {

    private Long idAlumno;

    private String dni;

    private String nombre;

    private String apellido;

    private LocalDate fechaNacimiento;

    private String nacionalidad;

    private String direccion;

    private Boolean activo;
}