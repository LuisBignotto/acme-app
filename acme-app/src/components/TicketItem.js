import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TicketItem = ({ ticket, onPress }) => {
    return (
        <TouchableOpacity style={styles.ticketItem} onPress={onPress}>
            <Text style={styles.ticketTitle}>{ticket.title}</Text>
            <Text style={styles.ticketStatus}>Status: {ticket.status}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ticketItem: {
        backgroundColor: 'rgba(54, 124, 255, 0.42)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    ticketTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ticketStatus: {
        fontSize: 16,
        color: '#555',
    },
});

export default TicketItem;
