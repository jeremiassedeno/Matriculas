import { useEffect, useState } from "react";
import { getResponsables, deleteResponsable } from "../api/responsable";
import ResponsableForm from "../Components/ResponsableForm";


function Responsables() {
  const [responsables, setResponsables] = useState([]);
  const [error, setError] = useState("");
  const [recargar, setRecargar] = useState(0);
  const [responsableEditando, setResponsableEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const responsablesFiltrados = responsables.filter((responsable) => {
  const texto = busqueda.toLowerCase();

  return (
    responsable.nombre?.toLowerCase().includes(texto) ||
    responsable.apellido?.toLowerCase().includes(texto) ||
    responsable.dni?.toLowerCase().includes(texto) ||
    responsable.telefono?.toLowerCase().includes(texto) ||
    responsable.ocupacionProfesion?.toLowerCase().includes(texto) ||
    responsable.ocupacion?.toLowerCase().includes(texto) ||
    responsable.nacionalidad?.toLowerCase().includes(texto)
  );
});

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const data = await getResponsables();

        if (activo) {
          setResponsables(data);
          setError("");
        }
      } catch (err) {
        console.error(err);

        if (activo) {
          setError("No se pudieron cargar los responsables");
        }
      }
    }

    cargar();

    return () => {
      activo = false;
    };
  }, [recargar]);

  const refrescarResponsables = () => {
    setResponsableEditando(null);
    setRecargar((valorActual) => valorActual + 1);
  };

  const eliminarResponsable = async (idResponsable) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este responsable?");

    if (!confirmar) return;

    try {
      await deleteResponsable(idResponsable);
      refrescarResponsables();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el responsable");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Responsables</h1>
      </div>

      <div className="card">
        <ResponsableForm
          key={responsableEditando ? responsableEditando.idResponsable : "nuevo"}
          responsableEditando={responsableEditando}
          onGuardado={refrescarResponsables}
          onCancelarEdicion={() => setResponsableEditando(null)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="card">
  <div className="form-group">
    <label>Buscar responsable</label>
    <input
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      placeholder="Buscar por nombre, apellido, DNI, teléfono u ocupación"
    />
  </div>
</div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Ocupación / Profesión</th>
              <th>Nacionalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {responsablesFiltrados.map((responsable) => (
              <tr key={responsable.idResponsable}>
                <td>{responsable.dni}</td>
                <td>{responsable.apellido}</td>
                <td>{responsable.nombre}</td>
                <td>{responsable.telefono}</td>
                <td>{responsable.ocupacionProfesion || responsable.ocupacion}</td>
                <td>{responsable.nacionalidad}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => setResponsableEditando(responsable)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => eliminarResponsable(responsable.idResponsable)}
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

export default Responsables;