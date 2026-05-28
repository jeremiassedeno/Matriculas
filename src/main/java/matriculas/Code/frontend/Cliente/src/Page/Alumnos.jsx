import { useEffect, useState } from "react";
import { getAlumnos, deleteAlumno } from "../api/alumno";
import AlumnoForm from "../Components/AlumnoForm";

function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState("");
  const [recargar, setRecargar] = useState(0);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const alumnosFiltrados = alumnos.filter((alumno) => {
  const texto = busqueda.toLowerCase();

  return (
    alumno.nombre?.toLowerCase().includes(texto) ||
    alumno.apellido?.toLowerCase().includes(texto) ||
    alumno.dni?.toLowerCase().includes(texto) ||
    alumno.nacionalidad?.toLowerCase().includes(texto) ||
    alumno.direccion?.toLowerCase().includes(texto)
  );
});

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const data = await getAlumnos();

        if (activo) {
          setAlumnos(data);
          setError("");
        }
      } catch (err) {
        console.error(err);

        if (activo) {
          setError("No se pudieron cargar los alumnos");
        }
      }
    }

    cargar();

    return () => {
      activo = false;
    };
  }, [recargar]);

  const refrescarAlumnos = () => {
    setAlumnoEditando(null);
    setRecargar((valorActual) => valorActual + 1);
  };

  const eliminarAlumno = async (idAlumno) => {
    if (!idAlumno) {
      setError("No se pudo eliminar el alumno: falta el ID");
      return;
    }

    const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?");

    if (!confirmar) return;

    try {
      await deleteAlumno(idAlumno);
      refrescarAlumnos();
    } catch (err) {
      console.error(err);
      setError(err.message || "No se pudo eliminar el alumno");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Alumnos</h1>
      </div>

      <div className="card">
        <AlumnoForm
          key={alumnoEditando ? alumnoEditando.idAlumno : "nuevo"}
          alumnoEditando={alumnoEditando}
          onGuardado={refrescarAlumnos}
          onCancelarEdicion={() => setAlumnoEditando(null)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="card">
        <div className="form-group">
    <label>Buscar alumno</label>
    <input
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      placeholder="Buscar por nombre, apellido, DNI, nacionalidad o dirección"
    />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DNI</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Fecha nacimiento</th>
              <th>Nacionalidad</th>
              <th>Dirección</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {alumnosFiltrados.map((alumno) => (
              <tr key={alumno.idAlumno}>
                <td>{alumno.idAlumno}</td>
                <td>{alumno.dni}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.fechaNacimiento}</td>
                <td>{alumno.nacionalidad}</td>
                <td>{alumno.direccion}</td>
                <td>
                  <span
                    className={
                      alumno.activo
                        ? "badge badge-success"
                        : "badge badge-muted"
                    }
                  >
                    {alumno.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => setAlumnoEditando(alumno)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => eliminarAlumno(alumno.idAlumno)}
                    style={{ marginLeft: "8px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Alumnos;
