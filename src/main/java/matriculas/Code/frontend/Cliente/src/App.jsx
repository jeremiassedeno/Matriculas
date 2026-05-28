import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Page/Login";
import Alumnos from "./Page/Alumnos";
import Responsables from "./Page/Responsables";
import Matriculas from "./Page/Matriculas";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./Components/Layout";
import AlumnoResponsable from "./Page/AlumnoResponsable";
import Vinculos from "./Page/Vinculos"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/alumnos"
          element={
            <ProtectedRoute>
              <Layout>
                <Alumnos />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/responsables"
          element={
            <ProtectedRoute>
              <Layout>
                <Responsables />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/matriculas"
          element={
            <ProtectedRoute>
              <Layout>
                <Matriculas />
              </Layout>
            </ProtectedRoute>
          }
        />

          <Route
    path="/alumno-responsable"
    element={
      <ProtectedRoute>
        <Layout>
          <AlumnoResponsable />
        </Layout>
      </ProtectedRoute>
    }
/>

        <Route path="*" element={<Navigate to="/alumnos" replace />} />
        <Route
  path="/vinculos"
  element={
    <ProtectedRoute>
      <Layout>
        <Vinculos />
      </Layout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;