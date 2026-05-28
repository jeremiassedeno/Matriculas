package matriculas.Code.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import matriculas.Code.backend.Model.Alumno;

import java.util.Optional;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    Optional<Alumno> findByDni(String dni);
}