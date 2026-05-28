import { useEffect, useState } from "react";
import { createMatricula, updateMatricula } from "../api/matricula";
import { getAlumnos } from "../api/alumno";
import BuscadorSelector from "./BuscadorSelector";





const crearEstadoInicial = (matriculaEditando) => ({
  nroOrden: matriculaEditando?.nroOrden || "",
  idAlumno: matriculaEditando?.idAlumno || "",
  seccion: matriculaEditando?.seccion || "",
  cicloLectivo: matriculaEditando?.cicloLectivo || new Date().getFullYear(),
  fechaEntrada: matriculaEditando?.fechaEntrada || "",
  fechaSalida: matriculaEditando?.fechaSalida || "",
  estado: matriculaEditando?.estado || "ACTIVO",
  observaciones: matriculaEditando?.observaciones || "",
});

function MatriculaForm({ matriculaEditando, onGuardado, onCancelarEdicion }) {
  const [alumnos, setAlumnos] = useState([]);
  const [form, setForm] = useState(() => crearEstadoInicial(matriculaEditando));
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

    const alumnoSeleccionado = alumnos.find(
    (alumno) => alumno.idAlumno === Number(form.idAlumno)
  );

  useEffect(() => {
    let activo = true;

    async function cargarAlumnos() {
      try {
        const data = await getAlumnos();

        if (activo) {
          setAlumnos(data);
        }
      } catch (err) {
        console.error(err);

        if (activo) {
          setError("No se pudieron cargar los alumnos");
        }
      }
    }

    cargarAlumnos();

    return () => {
      activo = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const limpiarFormulario = () => {
    setForm(crearEstadoInicial(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    if (!form.idAlumno) {
  setError("Seleccioná un alumno");
  setGuardando(false);
  return;
}

    try {
      const data = {
        ...form,
        nroOrden: form.nroOrden ? Number(form.nroOrden) : null,
        idAlumno: Number(form.idAlumno),
        cicloLectivo: Number(form.cicloLectivo),
        fechaSalida: form.fechaSalida || null,
      };

      if (matriculaEditando) {
    await updateMatricula(matriculaEditando.nroOrden, data);
  }   else {
    await createMatricula(data);
  }

      limpiarFormulario();

      if (onGuardado) {
        onGuardado();
      }
    } catch (err) {
      console.error(err);
      setError(
        matriculaEditando
          ? "No se pudo editar la matrícula"
          : "No se pudo crear la matrícula"
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{matriculaEditando ? "Editar matrícula" : "Nueva matrícula"}</h2>

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
  onSeleccionar={(alumno) =>
    setForm({
      ...form,
      idAlumno: alumno ? alumno.idAlumno : "",
    })
  }
/>

    

        <div className="form-group">
          <label>Sección</label>
          <input
            name="seccion"
            value={form.seccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ciclo lectivo</label>
          <input
            type="number"
            name="cicloLectivo"
            value={form.cicloLectivo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha de entrada</label>
          <input
            type="date"
            name="fechaEntrada"
            value={form.fechaEntrada}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha de salida</label>
          <input
            type="date"
            name="fechaSalida"
            value={form.fechaSalida}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="ACTIVO">ACTIVO</option>
            <option value="EGRESADO">EGRESADO</option>
            <option value="BAJA">BAJA</option>
            <option value="TRASLADO">TRASLADO</option>
          </select>
        </div>

        <div className="form-group">
          <label>Observaciones</label>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={guardando}>
          {guardando
            ? "Guardando..."
            : matriculaEditando
              ? "Guardar cambios"
              : "Guardar matrícula"}
        </button>

        {matriculaEditando && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancelarEdicion}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default MatriculaForm;
