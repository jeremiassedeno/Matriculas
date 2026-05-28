import { api } from './apiClient';

export const getResponsables = () => api.get('/responsables');
export const getResponsable = (id) => api.get(`/responsables/${id}`);
export const createResponsable = (responsable) => api.post('/responsables', responsable);
export const updateResponsable = (id, responsable) => api.put(`/responsables/${id}`, responsable);
export const deleteResponsable = (id) => api.delete(`/responsables/${id}`);