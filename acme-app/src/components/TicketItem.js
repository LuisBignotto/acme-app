import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TicketItem = ({ ticket, onPress }) => {
    return (
        <TouchableOpacity style={styles.ticketItem} onPress={onPress}>
            <Icon name="ticket" size={30} color="#367CFF" style={styles.ticketIcon} />
            <View style={styles.ticketTextContainer}>
                <Text style={styles.ticketTitle}>Título: {ticket.title}</Text>
                <Text style={styles.ticketStatus}>Status: {ticket.status}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ticketItem: {
        backgroundColor: '#E8F0FE',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ticketIcon: {
        marginRight: 15,
    },
    ticketTextContainer: {
        flex: 1,
    },
    ticketTitle: {
        fontSize: 12,
        color: '#3E3E3E',
        marginBottom: 5,
    },
    ticketStatus: {
        fontSize: 12,
        color: '#3E3E3E',
    },
});

export default TicketItem;
