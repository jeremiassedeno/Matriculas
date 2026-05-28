package matriculas.Code.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import matriculas.Code.backend.Model.EstadoMatricula;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaResponse {

    

    private Integer nroOrden;

    private Long idAlumno;

    private String nombreAlumno;

    private String apellidoAlumno;

    private String dniAlumno;

    private String seccion;

    private Integer cicloLectivo;

    private LocalDate fechaEntrada;

    private LocalDate fechaSalida;

    private EstadoMatricula estado;

    private String observaciones;
}