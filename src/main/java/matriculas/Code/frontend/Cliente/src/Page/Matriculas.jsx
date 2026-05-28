import { useEffect, useState } from "react";
import { getMatriculas, deleteMatricula } from "../api/matricula";
import MatriculaForm from "../Components/MatriculaForm";

function Matriculas() {
  const [matriculas, setMatriculas] = useState([]);
  const [error, setError] = useState("");
  const [recargar, setRecargar] = useState(0);
  const [matriculaEditando, setMatriculaEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const matriculasFiltradas = matriculas.filter((matricula) => {
  const texto = busqueda.toLowerCase();

  return (
    matricula.nombreAlumno?.toLowerCase().includes(texto) ||
    matricula.apellidoAlumno?.toLowerCase().includes(texto) ||
    matricula.dniAlumno?.toLowerCase().includes(texto) ||
    matricula.seccion?.toLowerCase().includes(texto) ||
    String(matricula.cicloLectivo || "").includes(texto) ||
    matricula.estado?.toLowerCase().includes(texto)
  );
});

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const data = await getMatriculas();

        if (activo) {
          setMatriculas(data);
          setError("");
        }
      } catch (err) {
        console.error(err);

        if (activo) {
          setError("No se pudieron cargar las matrículas");
        }
      }
    }

    cargar();

    return () => {
      activo = false;
    };
  }, [recargar]);

  const refrescarMatriculas = () => {
    setMatriculaEditando(null);
    setRecargar((valorActual) => valorActual + 1);
  };

  const eliminarMatricula = async (nroOrden) => {
    if (!nroOrden) {
      setError("No se pudo eliminar la matrícula: falta el ID");
      return;
    }

    const confirmar = window.confirm("¿Seguro que querés eliminar esta matrícula?");

    if (!confirmar) return;

    try {
      await deleteMatricula(nroOrden);
      refrescarMatriculas();
    } catch (err) {
      console.error(err);
      setError(err.message || "No se pudo eliminar la matrícula");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Matrículas</h1>
      </div>

      <div className="card">
        <MatriculaForm
          key={matriculaEditando ? matriculaEditando.nroOrden : "nuevo"}
          matriculaEditando={matriculaEditando}
          onGuardado={refrescarMatriculas}
          onCancelarEdicion={() => setMatriculaEditando(null)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="card">
        <div className="form-group">
          <label>Buscar matrícula</label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por alumno, DNI, sección, ciclo lectivo o estado"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>N.º Orden</th>
              <th>Alumno</th>
              <th>DNI</th>
              <th>Sección</th>
              <th>Ciclo lectivo</th>
              <th>Fecha entrada</th>
              <th>Fecha salida</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {matriculasFiltradas.map((matricula) => (
              <tr key={matricula.nroOrden}>
                <td>{matricula.nroOrden}</td>
                <td>
                  {matricula.apellidoAlumno}, {matricula.nombreAlumno}
                </td>
                <td>{matricula.dniAlumno}</td>
                <td>{matricula.seccion}</td>
                <td>{matricula.cicloLectivo}</td>
                <td>{matricula.fechaEntrada}</td>
                <td>{matricula.fechaSalida || "-"}</td>
                <td>
                  <span className="badge badge-success">{matricula.estado}</span>
                </td>
                <td>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => setMatriculaEditando(matricula)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => eliminarMatricula(matricula.nroOrden)}
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

export default Matriculas;
