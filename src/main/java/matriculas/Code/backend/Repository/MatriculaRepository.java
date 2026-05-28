package matriculas.Code.backend.Repository;

import matriculas.Code.backend.Model.EstadoMatricula;
import matriculas.Code.backend.Model.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatriculaRepository extends JpaRepository<Matricula, Integer> {

    List<Matricula> findByAlumnoIdAlumno(Long idAlumno);

    List<Matricula> findByCicloLectivo(Integer cicloLectivo);

    List<Matricula> findBySeccion(String seccion);

    List<Matricula> findByEstado(EstadoMatricula estado);

    List<Matricula> findByCicloLectivoAndSeccion(Integer cicloLectivo, String seccion);
}
