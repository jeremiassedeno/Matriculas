package matriculas.Code.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "alumno_responsable",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_alumno", "id_responsable"})
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoResponsable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alumno_responsable")
    private Long idAlumnoResponsable;

    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "id_responsable", nullable = false)
    private Responsable responsable;

    @Column(name = "vinculo", length = 50)
    private String vinculo;

}