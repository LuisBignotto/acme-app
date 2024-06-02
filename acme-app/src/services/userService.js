import api from './axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
    try {
        const response = await api.post('/user-ms/users/login', { email, password });
        await AsyncStorage.setItem('userToken', response.data.token);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
};

export const getUserProfile = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await api.get('/user-ms/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar perfil do usuário');
    }
};

export const updateUserProfile = async (userId, updatedData) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        await api.put(`/${userId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil do usuário');
    }
};
