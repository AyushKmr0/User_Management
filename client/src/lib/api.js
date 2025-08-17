import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const Users = {
    list: ({ page = 1, limit = 10, q = '' } = {}) =>
        api.get('/users', { params: { page, limit, q } }).then(r => r.data),

    get: (id) => api.get(`/users/${ id }`).then(r => r.data),

    create: (payload) => {
        const form = new FormData();
        Object.entries(payload).forEach(([k, v]) => v !== undefined && form.append(k, v));
        return api.post('/users', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
    },

    update: (id, payload) => {
        const form = new FormData();
        Object.entries(payload).forEach(([k, v]) => v !== undefined && form.append(k, v));
        return api.put(`/users/${ id }`, form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
    },

    remove: (id) => api.delete(`/users/${ id }`).then(r => r.data),

    exportCSV: (q = '') => api.get('/users/export', { params: { q }, responseType: 'blob' })
};
