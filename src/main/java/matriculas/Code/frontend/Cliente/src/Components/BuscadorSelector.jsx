import { useState } from "react";

function BuscadorSelector({
  label,
  placeholder,
  items,
  getId,
  getTextoPrincipal,
  getTextoSecundario,
  onSeleccionar,
  itemSeleccionado,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [abierto, setAbierto] = useState(false);

  const textoNormalizado = busqueda.toLowerCase().trim();

  const itemsFiltrados = items.filter((item) => {
    const textoPrincipal = getTextoPrincipal(item).toLowerCase();
    const textoSecundario = getTextoSecundario
      ? getTextoSecundario(item).toLowerCase()
      : "";

    return (
      textoPrincipal.includes(textoNormalizado) ||
      textoSecundario.includes(textoNormalizado)
    );
  });

  const seleccionar = (item) => {
    onSeleccionar(item);
    setBusqueda("");
    setAbierto(false);
  };

  return (
    <div className="form-group buscador-selector">
      <label>{label}</label>

      {itemSeleccionado && (
        <div className="selected-item">
          <div>
            <strong>{getTextoPrincipal(itemSeleccionado)}</strong>
            {getTextoSecundario && (
              <span className="subtext">{getTextoSecundario(itemSeleccionado)}</span>
            )}
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onSeleccionar(null)}
          >
            Cambiar
          </button>
        </div>
      )}

      {!itemSeleccionado && (
        <>
          <input
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setAbierto(true);
            }}
            onFocus={() => setAbierto(true)}
            placeholder={placeholder}
          />

          {abierto && busqueda && (
            <div className="search-results">
              {itemsFiltrados.length === 0 ? (
                <div className="search-result-empty">
                  No se encontraron resultados
                </div>
              ) : (
                itemsFiltrados.slice(0, 10).map((item) => (
                  <button
                    key={getId(item)}
                    type="button"
                    className="search-result-item"
                    onClick={() => seleccionar(item)}
                  >
                    <strong>{getTextoPrincipal(item)}</strong>
                    {getTextoSecundario && (
                      <span>{getTextoSecundario(item)}</span>
                    )}
                  </button>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BuscadorSelector;