package matriculas.Code.backend.dto.Response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import matriculas.Code.backend.Model.EstadoMatricula;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaDetalleResponse {

    private Long idMatricula;

    private Integer nroOrden;

    private String seccion;

    private Integer cicloLectivo;

    private LocalDate fechaEntrada;

    private LocalDate fechaSalida;

    private EstadoMatricula estado;

    private String observaciones;

    private AlumnoResponse alumno;

    private List<AlumnoResponsableResponse> responsables;
}