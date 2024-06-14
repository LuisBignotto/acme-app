import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationContext } from '../contexts/NavigationContext';

const DEFAULT_EXPIRATION_TIME_IN_MINUTES = 30; // 30 minutos

export const getSessionForRequest = async () => {
    const jsonData = await AsyncStorage.getItem('session');

    if (!jsonData) {
        return null;
    }

    const data = JSON.parse(jsonData);

    return data;
}   


function useSession() {
    const { reset } = useNavigationContext();

    const generateCreatedAt = () => {
        const now = new Date();

        now.setMinutes(now.getMinutes() + DEFAULT_EXPIRATION_TIME_IN_MINUTES);

        return Math.floor(now.getTime() / 1000); 
    }

    const isSessionValid = async (createdAt) => {
        const currentTimestamp = Math.floor(Data.now() / 1000);

        if (currentTimestamp >= createdAt) {
            await AsyncStorage.removeItem('session');

            return false;
        }

        return true;
    }

    const getSession = async () => {
        const jsonData = await AsyncStorage.getItem('session');
    
        if (!jsonData) {
            return null;
        }

        const data = JSON.parse(jsonData);

        if (!isSessionValid(data.createdAt)) {
            return null;
        }

        return data;
    }   

    const createSession = async (userId, jwtToken, roleId) => {
        try {

            await AsyncStorage.setItem(
                'session',
                JSON.stringify({
                    createdAt: generateCreatedAt(),
                    userId,
                    jwtToken,
                    roleId
                })
            );

        } catch (error) {
            console.error(`Ocorreu um erro ao criar a sessao: ${error}`);
        }
    }

    const deleteSession = async () =>{
        await AsyncStorage.removeItem('session');

        reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return {
        isSessionValid,
        getSession,
        createSession,
        deleteSession
    }
}

export default useSession;