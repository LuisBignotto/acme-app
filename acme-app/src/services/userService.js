import api from './axiosInterceptor';

export const login = async (email, password) => {
    try {
        const response = await api.post('/user-ms/users/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get('/user-ms/users/me');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar perfil do usuário');
    }
};

export const updateUserProfile = async (userId, updatedData) => {
    try {
        await api.put(`/user-ms/users/${userId}`, updatedData);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil do usuário');
    }
};
