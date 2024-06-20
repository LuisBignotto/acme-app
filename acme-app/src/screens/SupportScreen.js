import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUserTickets } from '../services/ticketService';
import TicketItem from '../components/TicketItem';
import FaqItem from '../components/FaqItem';
import useSession from '../hooks/useSession';

const SupportScreen = ({ navigation }) => {
    const { getSession } = useSession();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTickets = async () => {
        setLoading(true);
        setError(null);
        try {
            const session = await getSession();
            const data = await getUserTickets(Number(session.userId));
            setTickets(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchTickets();
        }, [])
    );

    const handleCreateTicket = () => {
        navigation.navigate('CreateTicket');
    };

    const handleTicketPress = (ticket) => {
        navigation.navigate('TicketDetails', { ticket });
    };

    const faqs = [
        {
            question: 'Como rastrear minha bagagem?',
            answer: 'Você pode rastrear sua bagagem através do nosso aplicativo na seção "Minhas Bagagens".'
        },
        {
            question: 'Qual o código de rastreio da minha mala?',
            answer: 'O código de rastreio da sua mala é fornecido após o check-in e pode ser encontrado na etiqueta da bagagem.'
        },
        {
            question: 'Minha mala sumiu, o que devo fazer?',
            answer: 'Entre em contato com nosso suporte imediatamente através da seção "Abrir um ticket".'
        }
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Suporte</Text>

            <Text style={styles.subtitle}>Seus Tickets</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : tickets.length === 0 ? (
                <Text style={styles.noTicketsText}>Nenhum ticket aberto.</Text>
            ) : (
                tickets.map(ticket => (
                    <TicketItem key={ticket.id} ticket={ticket} onPress={() => handleTicketPress(ticket)} />
                ))
            )}

            <Text style={styles.subtitle}>Perguntas Frequentes</Text>
            <View>
                {faqs.map((faq, index) => (
                    <FaqItem key={index} faq={faq} />
                ))}
                <TouchableOpacity style={styles.contactButton} onPress={handleCreateTicket}>
                    <Text style={styles.contactButtonText}>Abrir um ticket</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    noTicketsText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    contactButton: {
        backgroundColor: '#367CFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SupportScreen;
