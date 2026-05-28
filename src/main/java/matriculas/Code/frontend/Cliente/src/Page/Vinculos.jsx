import { useCallback, useEffect, useState } from "react";
import {
  buscarVinculos,
  desvincularAlumnoResponsable,
} from "../api/alumnoResponsable";

function Vinculo() {
  const [buscar, setBuscar] = useState("");
  const [vinculos, setVinculos] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const cargarVinculos = useCallback(async (texto = "") => {
    setCargando(true);
    setError("");

    try {
      const data = await buscarVinculos(texto);
      setVinculos(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los vínculos");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      cargarVinculos(buscar);
    }, 400);

    return () => clearTimeout(timeout);
  }, [buscar, cargarVinculos]);

  const eliminarVinculo = async (idAlumnoResponsable) => {
    const confirmar = window.confirm(
      "¿Seguro que querés desvincular este responsable?"
    );

    if (!confirmar) return;

    try {
      await desvincularAlumnoResponsable(idAlumnoResponsable);
      await cargarVinculos(buscar);
    } catch (err) {
      console.error(err);
      setError("No se pudo desvincular el responsable");
    }
  };

  return (
  <div className="page">
    <div className="page-header">
      <div>
        <h1 className="page-title">Búsqueda de vínculos</h1>
        <p className="search-description">
          Buscá rápidamente por alumno, DNI, responsable, teléfono o sección.
        </p>
      </div>
    </div>

    <div className="search-card">
      <h2 className="search-title">Buscar alumno o responsable</h2>

      <input
        className="search-input"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        placeholder="Ej: Gómez, 50123456, Laura, 1122334455, Sala de 5"
      />
    </div>

    {error && <p className="error">{error}</p>}

    <div className="result-summary">
      {cargando
        ? "Buscando vínculos..."
        : `${vinculos.length} resultado(s) encontrado(s)`}
    </div>

    {vinculos.length === 0 && !cargando ? (
      <div className="empty-state">
        No se encontraron vínculos con ese criterio de búsqueda.
      </div>
    ) : (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Sección</th>
              <th>Responsable</th>
              <th>Vínculo</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {vinculos.map((vinculo) => (
              <tr key={vinculo.idAlumnoResponsable}>
                <td>
                  <span className="alumno-cell">
                    {vinculo.apellidoAlumno}, {vinculo.nombreAlumno}
                  </span>
                  <span className="subtext">DNI: {vinculo.dniAlumno}</span>
                </td>

                <td>
                  {vinculo.seccion || "-"}
                  <span className="subtext">
                    Ciclo: {vinculo.cicloLectivo || "-"}
                  </span>
                </td>

                <td>
                  <strong>
                    {vinculo.apellidoResponsable}, {vinculo.nombreResponsable}
                  </strong>
                  <span className="subtext">
                    DNI: {vinculo.dniResponsable}
                  </span>
                </td>

                <td>
                  <span className="badge badge-info">
                    {vinculo.vinculo}
                  </span>
                </td>

                <td>{vinculo.telefonoResponsable || "-"}</td>

                <td>
                  <span
                    className={
                      vinculo.estado === "ACTIVO"
                        ? "badge badge-success"
                        : "badge badge-warning"
                    }
                  >
                    {vinculo.estado || "Sin matrícula"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() =>
                      eliminarVinculo(vinculo.idAlumnoResponsable)
                    }
                  >
                    Desvincular
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}

export default Vinculo;