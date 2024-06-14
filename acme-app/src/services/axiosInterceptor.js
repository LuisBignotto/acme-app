import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { reset } from '../navigation/RootNavigation';

import { getSessionForRequest } from '../hooks/useSession';

const API_URL = 'http://192.168.15.156:8080';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    async (config) => {
        const session = await getSessionForRequest();

        if (session && session.jwtToken) {
            config.headers.Authorization = `Bearer ${session.jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    async error => {
        const { response } = error;
        if (response.status === 401) {
            await AsyncStorage.removeItem('session');
            
            Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
            reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
        return Promise.reject(error);
    }
);

export default api;
