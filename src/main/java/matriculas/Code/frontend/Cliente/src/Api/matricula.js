import { api } from "./apiClient";

export const getMatriculas = () => api.get("/matriculas");

export const getMatricula = (nroOrden) =>
  api.get(`/matriculas/${nroOrden}`);

export const createMatricula = (matricula) =>
  api.post("/matriculas", matricula);

export const updateMatricula = (nroOrden, matricula) =>
  api.put(`/matriculas/${nroOrden}`, matricula);

export const deleteMatricula = (nroOrden) =>
  api.delete(`/matriculas/${nroOrden}`);
