import { useEffect, useState } from "react";
import { getAlumnos } from "../api/alumno";
import { getResponsables } from "../api/responsable";
import {
  buscarResponsablesDeAlumno,
  vincularAlumnoResponsable,
  desvincularAlumnoResponsable,
} from "../api/alumnoResponsable";
import BuscadorSelector from "../Components/BuscadorSelector";

function AlumnoResponsable() {
  const [alumnos, setAlumnos] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [idAlumno, setIdAlumno] = useState("");
  const [idResponsable, setIdResponsable] = useState("");
  const [vinculo, setVinculo] = useState("");
  const [responsablesAlumno, setResponsablesAlumno] = useState([]);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const alumnoSeleccionado = alumnos.find(
  (alumno) => alumno.idAlumno === Number(idAlumno)
);

const responsableSeleccionado = responsables.find(
  (responsable) => responsable.idResponsable === Number(idResponsable)
);

  useEffect(() => {
    let activo = true;

    async function cargarDatosIniciales() {
      try {
        const [alumnosData, responsablesData] = await Promise.all([
          getAlumnos(),
          getResponsables(),
        ]);

        if (activo) {
          setAlumnos(alumnosData);
          setResponsables(responsablesData);
        }
      } catch (err) {
        console.error(err);

        if (activo) {
          setError("No se pudieron cargar alumnos o responsables");
        }
      }
    }

    cargarDatosIniciales();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    let activo = true;

    async function cargarResponsablesDelAlumno() {
      if (!idAlumno) {
        setResponsablesAlumno([]);
        return;
      }

      try {
        const data = await buscarResponsablesDeAlumno(idAlumno);

        if (activo) {
          setResponsablesAlumno(data);
          setError("");
        }
      } catch (err) {
        console.error(err);

        if (activo) {
          setError("No se pudieron cargar los responsables del alumno");
        }
      }
    }

    cargarResponsablesDelAlumno();

    return () => {
      activo = false;
    };
  }, [idAlumno]);

  const refrescarResponsablesDelAlumno = async () => {
    if (!idAlumno) return;

    const data = await buscarResponsablesDeAlumno(idAlumno);
    setResponsablesAlumno(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!idAlumno || !idResponsable) {
      setError("Seleccioná un alumno y un responsable");
      return;
    }

    setGuardando(true);

    try {
      await vincularAlumnoResponsable({
        idAlumno: Number(idAlumno),
        idResponsable: Number(idResponsable),
        vinculo,
      });

      setIdResponsable("");
      setVinculo("");

      await refrescarResponsablesDelAlumno();
    } catch (err) {
      console.error(err);
      setError("No se pudo vincular el responsable con el alumno");
    } finally {
      setGuardando(false);
    }
  };

  const eliminarVinculo = async (idAlumnoResponsable) => {
    const confirmar = window.confirm("¿Seguro que querés desvincular este responsable?");

    if (!confirmar) return;

    try {
      await desvincularAlumnoResponsable(idAlumnoResponsable);
      await refrescarResponsablesDelAlumno();
    } catch (err) {
      console.error(err);
      setError("No se pudo desvincular el responsable");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Responsables por alumno</h1>
      </div>

      <div className="card">
        <h2>Seleccionar alumno</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-grid">
          <BuscadorSelector
  label="Alumno"
  placeholder="Buscar alumno por apellido, nombre o DNI"
  items={alumnos}
  getId={(alumno) => alumno.idAlumno}
  getTextoPrincipal={(alumno) => `${alumno.apellido}, ${alumno.nombre}`}
  getTextoSecundario={(alumno) => `DNI: ${alumno.dni}`}
  itemSeleccionado={alumnoSeleccionado}
  onSeleccionar={(alumno) => {
    setIdAlumno(alumno ? alumno.idAlumno : "");
    setResponsablesAlumno([]);
  }}
/>
        </div>
      </div>

      {idAlumno && (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h2>Vincular responsable</h2>

            <div className="form-grid">
              <BuscadorSelector
  label="Responsable"
  placeholder="Buscar responsable por apellido, nombre, DNI o teléfono"
  items={responsables}
  getId={(responsable) => responsable.idResponsable}
  getTextoPrincipal={(responsable) =>
    `${responsable.apellido}, ${responsable.nombre}`
  }
  getTextoSecundario={(responsable) =>
    `DNI: ${responsable.dni} - Tel: ${responsable.telefono || "-"}`
  }
  itemSeleccionado={responsableSeleccionado}
  onSeleccionar={(responsable) =>
    setIdResponsable(responsable ? responsable.idResponsable : "")
  }
/>

              <div className="form-group">
                <label>Vínculo</label>
                <select
                  value={vinculo}
                  onChange={(e) => setVinculo(e.target.value)}
                  required
                >
                  <option value="">Seleccionar vínculo</option>
                  <option value="Madre">Madre</option>
                  <option value="Padre">Padre</option>
                  <option value="Tutor">Tutor</option>
                  <option value="Abuela/o">Abuela/o</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="actions">
              <button className="btn btn-primary" type="submit" disabled={guardando}>
                {guardando ? "Vinculando..." : "Vincular responsable"}
              </button>
            </div>
          </form>
        </div>
      )}

      {idAlumno && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Responsable</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Vínculo</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {responsablesAlumno.map((relacion) => (
                <tr key={relacion.idAlumnoResponsable}>
                  <td>
                    {relacion.apellidoResponsable}, {relacion.nombreResponsable}
                  </td>
                  <td>{relacion.dniResponsable}</td>
                  <td>{relacion.telefonoResponsable}</td>
                  <td>{relacion.vinculo}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => eliminarVinculo(relacion.idAlumnoResponsable)}
                    >
                      Desvincular
                    </button>
                  </td>
                </tr>
              ))}

              {responsablesAlumno.length === 0 && (
                <tr>
                  <td colSpan="5">Este alumno todavía no tiene responsables vinculados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AlumnoResponsable;