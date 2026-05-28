package matriculas.Code.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import matriculas.Code.backend.Model.AlumnoResponsable;
import matriculas.Code.backend.dto.Projection.VinculoListadoProjection;

import java.util.List;
import java.util.Optional;

public interface AlumnoResponsableRepository extends JpaRepository<AlumnoResponsable, Long> {

    @Query(
        value = "SELECT * FROM alumno_responsable WHERE id_alumno = :idAlumno",
        nativeQuery = true
    )
    List<AlumnoResponsable> buscarPorAlumno(@Param("idAlumno") Long idAlumno);

    @Query(
        value = "SELECT * FROM alumno_responsable WHERE id_responsable = :idResponsable",
        nativeQuery = true
    )
    List<AlumnoResponsable> buscarPorResponsable(@Param("idResponsable") Long idResponsable);

    @Query(
        value = """
                SELECT * 
                FROM alumno_responsable 
                WHERE id_alumno = :idAlumno 
                AND id_responsable = :idResponsable
                """,
        nativeQuery = true
    )
    Optional<AlumnoResponsable> buscarPorAlumnoYResponsable(
            @Param("idAlumno") Long idAlumno,
            @Param("idResponsable") Long idResponsable
    );

    @Query(
    value = """
            SELECT
                a.id_alumno AS idAlumno,
                a.nombre AS nombreAlumno,
                a.apellido AS apellidoAlumno,
                a.dni AS dniAlumno,

                r.id_responsable AS idResponsable,
                r.nombre AS nombreResponsable,
                r.apellido AS apellidoResponsable,
                r.dni AS dniResponsable,
                r.telefono AS telefonoResponsable,

                ar.id_alumno_responsable AS idAlumnoResponsable,
                ar.vinculo AS vinculo,

                m.nro_orden AS nroOrden,
                m.seccion AS seccion,
                m.ciclo_lectivo AS cicloLectivo,
                m.estado AS estado

            FROM alumno_responsable ar
            INNER JOIN alumnos a ON ar.id_alumno = a.id_alumno
            INNER JOIN responsables r ON ar.id_responsable = r.id_responsable
            LEFT JOIN matriculas m ON m.id_alumno = a.id_alumno

            WHERE (
                :buscar IS NULL OR :buscar = '' OR
                LOWER(a.nombre) LIKE LOWER(CONCAT('%', :buscar, '%')) OR
                LOWER(a.apellido) LIKE LOWER(CONCAT('%', :buscar, '%')) OR
                a.dni LIKE CONCAT('%', :buscar, '%') OR
                LOWER(r.nombre) LIKE LOWER(CONCAT('%', :buscar, '%')) OR
                LOWER(r.apellido) LIKE LOWER(CONCAT('%', :buscar, '%')) OR
                r.dni LIKE CONCAT('%', :buscar, '%') OR
                r.telefono LIKE CONCAT('%', :buscar, '%') OR
                LOWER(m.seccion) LIKE LOWER(CONCAT('%', :buscar, '%'))
            )

            ORDER BY a.apellido ASC, a.nombre ASC, r.apellido ASC
            """,
    nativeQuery = true
)
List<VinculoListadoProjection> buscarVinculos(@Param("buscar") String buscar);
}