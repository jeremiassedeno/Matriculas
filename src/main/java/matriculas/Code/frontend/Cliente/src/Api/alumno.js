import { api } from './apiClient';

export const getAlumnos = () => api.get('/alumnos');
export const getAlumno = (id) => api.get(`/alumnos/${id}`);
export const createAlumno = (alumno) => api.post('/alumnos', alumno);
export const updateAlumno = (id, alumno) => api.put(`/alumnos/${id}`, alumno);
export const deleteAlumno = (id) => api.delete(`/alumnos/${id}`);