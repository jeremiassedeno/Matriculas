package matriculas.Code.backend.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

import matriculas.Code.backend.Model.EstadoMatricula;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaRequest {

    @NotNull
    private Integer nroOrden;
    
    @NotNull
    private Long idAlumno;

    private String seccion;

    private Integer cicloLectivo;

    private LocalDate fechaEntrada;

    private LocalDate fechaSalida;

    private EstadoMatricula estado;

    private String observaciones;
}