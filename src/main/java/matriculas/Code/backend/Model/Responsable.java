package matriculas.Code.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "responsables")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Responsable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_responsable")
    private Long id;

    @Column(name = "dni", unique = true, nullable = false)
    private String dni;

    @Column(name = "ocupacion", length = 45)
    private String ocupacion;

    @Column(name = "telefono",length = 70)
    private String telefono;

    @Column(name = "nombre", length = 45, nullable = false)
    private String nombre;
    
    @Column(name = "apellido", length = 45, nullable = false)
    private String apellido;

    @Column(name = "nacionalidad", length = 45)
    private String nacionalidad;
    
}
