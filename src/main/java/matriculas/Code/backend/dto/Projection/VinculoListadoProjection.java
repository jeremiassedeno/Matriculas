package matriculas.Code.backend.dto.Projection;

public interface VinculoListadoProjection {

    Long getIdAlumno();
    String getNombreAlumno();
    String getApellidoAlumno();
    String getDniAlumno();

    Long getIdResponsable();
    String getNombreResponsable();
    String getApellidoResponsable();
    String getDniResponsable();
    String getTelefonoResponsable();

    Long getIdAlumnoResponsable();
    String getVinculo();

    Integer getNroOrden();
    String getSeccion();
    Integer getCicloLectivo();
    String getEstado();
}