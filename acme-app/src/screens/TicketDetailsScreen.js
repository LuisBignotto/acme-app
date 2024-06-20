import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getMessagesByTicketId, addMessage } from '../services/ticketService';
import MessageItem from '../components/MessageItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import useSession from '../hooks/useSession';

const TicketDetailsScreen = ({ route, navigation }) => {
    const { ticket } = route.params;
    const { getSession } = useSession();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessagesByTicketId(ticket.id);
                setMessages(data);
            } catch (error) {
                Alert.alert('Erro', error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchSessionAndMessages = async () => {
            const session = await getSession();
            setUserId(session.userId);
            fetchMessages();
        };

        fetchSessionAndMessages();

        const interval = setInterval(fetchMessages, 5000);

        return () => clearInterval(interval);
    }, [ticket.id]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            Alert.alert('Erro', 'A mensagem não pode estar vazia');
            return;
        }

        try {
            const message = { message: newMessage, senderId: userId };
            await addMessage(ticket.id, message);
            setMessages([...messages, message]);
            setNewMessage('');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#367CFF" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.messageContainer}>
                {messages.map((message, index) => (
                    <MessageItem
                        key={index}
                        message={message}
                        isMine={message.senderId == userId}
                    />
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Digite sua mensagem"
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    messageContainer: {
        flex: 1,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#367CFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default TicketDetailsScreen;
