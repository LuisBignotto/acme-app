import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { reset } from '../navigation/RootNavigation';

const API_URL = 'http://192.168.15.156:8080';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.response.use(
    response => response,
    async error => {
        const { response } = error;
        if (response.status === 401) {
            await AsyncStorage.removeItem('userToken');
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
