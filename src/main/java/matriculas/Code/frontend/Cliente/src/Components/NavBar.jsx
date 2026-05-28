import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Sistema de Matrículas</div>

      <div className="navbar-links">
        <Link to="/alumnos">Alumnos</Link>
        <Link to="/responsables">Responsables</Link>
        <Link to="/vinculos">Vínculos</Link>
        <Link to="/alumno-responsable">Alumno-Responsable</Link>
        <Link to="/matriculas">Matrículas</Link>
      </div>

      <button className="btn btn-secondary" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;