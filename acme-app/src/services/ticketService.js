import api from './axiosInterceptor';

export const getUserTickets = async (userId) => {
    try {
        const response = await api.get(`/ticket-ms/tickets/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar tickets do usuário');
    }
};

export const createTicket = async (ticket) => {
    try {
        const response = await api.post('/ticket-ms/tickets', ticket);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao criar ticket');
    }
};

export const getMessagesByTicketId = async (ticketId) => {
    try {
        const response = await api.get(`/ticket-ms/tickets/${ticketId}/messages`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar mensagens do ticket');
    }
};

export const addMessage = async (ticketId, message) => {
    try {
        const response = await api.post(`/ticket-ms/tickets/${ticketId}/messages`, message);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao adicionar mensagem ao ticket');
    }
};
