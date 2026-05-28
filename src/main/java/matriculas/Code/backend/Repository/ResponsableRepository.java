package matriculas.Code.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import matriculas.Code.backend.Model.Responsable;

import java.util.Optional;

public interface ResponsableRepository extends JpaRepository<Responsable, Long> {

    Optional<Responsable> findByDni(String dni);
}