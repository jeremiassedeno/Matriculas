package matriculas.Code.backend.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "matriculas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nro_orden")
    private Integer nroOrden;

    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;

    @Column(nullable = false, length = 50)
    private String seccion;

    @Column(name = "ciclo_lectivo", nullable = false)
    private Integer cicloLectivo;

    @Column(name = "fecha_entrada")
    private LocalDate fechaEntrada;

    @Column(name = "fecha_salida")
    private LocalDate fechaSalida;

    @Enumerated(EnumType.STRING)
    @Column(name="estado", nullable = false)
    private EstadoMatricula estado = EstadoMatricula.ACTIVO;

    @Column(name="observaciones", columnDefinition = "TEXT")
    private String observaciones;
}