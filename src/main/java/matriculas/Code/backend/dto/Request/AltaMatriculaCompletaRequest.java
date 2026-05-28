package matriculas.Code.backend.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AltaMatriculaCompletaRequest {

    private AlumnoRequest alumno;

    private List<ResponsableRequest> responsables;

    private MatriculaRequest matricula;
}