import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageItem = ({ message, isMine }) => {
    return (
        <View style={[styles.messageContainer, isMine ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{message.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        maxWidth: '80%',
        padding: 10,
        marginBottom: 10,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#367CFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#144EBA',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MessageItem;
