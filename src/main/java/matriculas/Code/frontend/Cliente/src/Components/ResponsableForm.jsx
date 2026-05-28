import { useState } from "react";
import { createResponsable, updateResponsable } from "../api/responsable";

const crearEstadoInicial = (responsableEditando) => ({
  dni: responsableEditando?.dni || "",
  nombre: responsableEditando?.nombre || "",
  apellido: responsableEditando?.apellido || "",
  telefono: responsableEditando?.telefono || "",
  ocupacionProfesion:
    responsableEditando?.ocupacionProfesion || responsableEditando?.ocupacion || "",
  nacionalidad: responsableEditando?.nacionalidad || "",
});

function ResponsableForm({ responsableEditando, onGuardado, onCancelarEdicion }) {
  const [form, setForm] = useState(() => crearEstadoInicial(responsableEditando));
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

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

    try {
      if (responsableEditando) {
        await updateResponsable(responsableEditando.idResponsable, form);
      } else {
        await createResponsable(form);
      }

      limpiarFormulario();

      if (onGuardado) {
        onGuardado();
      }
    } catch (err) {
      console.error(err);
      setError(
        responsableEditando
          ? "No se pudo editar el responsable"
          : "No se pudo crear el responsable"
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{responsableEditando ? "Editar responsable" : "Nuevo responsable"}</h2>

      {error && <p className="error">{error}</p>}

      <div className="form-grid">
        <div className="form-group">
          <label>DNI</label>
          <input name="dni" value={form.dni} onChange={handleChange} required />
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
          <label>Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Ocupación / Profesión</label>
          <input
            name="ocupacionProfesion"
            value={form.ocupacionProfesion}
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
      </div>

      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={guardando}>
          {guardando
            ? "Guardando..."
            : responsableEditando
              ? "Guardar cambios"
              : "Guardar responsable"}
        </button>

        {responsableEditando && (
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

export default ResponsableForm;