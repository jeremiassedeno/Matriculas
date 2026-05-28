import { api } from "./apiClient";

export const vincularAlumnoResponsable = (data) =>
  api.post("/alumno-responsable", data);

export const buscarResponsablesDeAlumno = (idAlumno) =>
  api.get(`/alumno-responsable/alumno/${idAlumno}`);

export const desvincularAlumnoResponsable = (idAlumnoResponsable) =>
  api.delete(`/alumno-responsable/${idAlumnoResponsable}`);

export const buscarVinculos = (buscar = "") =>
  api.get(`/alumno-responsable/buscar?buscar=${encodeURIComponent(buscar)}`);