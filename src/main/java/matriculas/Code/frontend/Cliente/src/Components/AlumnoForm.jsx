import { useState } from "react";
import { createAlumno, updateAlumno } from "../api/alumno";

const crearEstadoInicial = (alumnoEditando) => ({
  dni: alumnoEditando?.dni || "",
  nombre: alumnoEditando?.nombre || "",
  apellido: alumnoEditando?.apellido || "",
  fechaNacimiento: alumnoEditando?.fechaNacimiento || "",
  nacionalidad: alumnoEditando?.nacionalidad || "",
  direccion: alumnoEditando?.direccion || "",
  activo: alumnoEditando?.activo ?? true,
});

function AlumnoForm({ alumnoEditando, onGuardado, onCancelarEdicion }) {
  const [form, setForm] = useState(() => crearEstadoInicial(alumnoEditando));
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const limpiarFormulario = () => {
    setForm(crearEstadoInicial(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGuardando(true);

    try {
      if (alumnoEditando) {
        await updateAlumno(alumnoEditando.idAlumno, form);
      } else {
        await createAlumno(form);
      }

      limpiarFormulario();

      if (onGuardado) {
        onGuardado();
      }
    } catch (err) {
      console.error(err);
      setError(alumnoEditando ? "No se pudo editar el alumno" : "No se pudo crear el alumno");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{alumnoEditando ? "Editar alumno" : "Nuevo alumno"}</h2>

      {error && <p className="error">{error}</p>}

      <div className="form-grid">
        <div className="form-group">
          <label>DNI</label>
          <input name="dni" value={form.dni} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Nacionalidad</label>
          <input
            name="nacionalidad"
            value={form.nacionalidad}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <label>
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
            />
            {" "}Activo
          </label>
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={guardando}>
          {guardando
            ? "Guardando..."
            : alumnoEditando
              ? "Guardar cambios"
              : "Guardar alumno"}
        </button>

        {alumnoEditando && (
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

export default AlumnoForm;