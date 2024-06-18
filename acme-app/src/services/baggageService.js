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

export const getBaggageByTag = async (tag) => {
    try {
        const response = await api.get(`/baggage-ms/baggages/tag/${tag}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar bagagem pela tag');
    }
};

export const updateBaggageWithTracker = async (id, baggage) => {
    try {
        const response = await api.put(`/baggage-ms/baggages/${id}`, baggage);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao atualizar bagagem com tracker');
    }
};

export const getBaggagesTrackedByUser = async (userId) => {
    try {
        const response = await api.get(`/baggage-ms/baggages/tracker/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar bagagens rastreadas pelo usuário');
    }
};

export const getAllBaggages = async () => {
    try {
        const response = await api.get('/baggage-ms/baggages');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar bagagens');
    }
};

export const updateBaggageStatus = async (baggageId, status) => {
    try {
        await api.put(`/baggage-ms/baggages/${baggageId}/status`, { status });
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao atualizar status da bagagem');
    }
};