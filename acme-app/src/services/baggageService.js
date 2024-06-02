import api from './axiosInterceptor';

export const deleteBaggage = async (id) => {
    try {
        const response = await api.delete(`/baggage-ms/baggages/${id}`);
        if (response.status === 204) {
            return 'Bagagem deletada com sucesso';
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao deletar a bagagem');
    }
};
