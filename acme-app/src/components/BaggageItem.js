import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BaggageItem = ({ baggage, index, onPress }) => {
    return (
        <TouchableOpacity style={styles.baggageItem} onPress={onPress}>
            <Icon name="suitcase" size={24} color="#367CFF" style={styles.baggageIcon} />
            <Text style={styles.txtBaggage}>Mala {index + 1}</Text>
            <Text style={styles.txtBaggageSec}>Status: {baggage.status.status}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    baggageItem: {
        backgroundColor: 'rgba(54, 124, 255, 0.42)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'Column',
    },
    baggageIcon: {
        marginRight: 10,
    },
    txtBaggage: {
        fontSize: 15,
    },
    txtBaggageSec: {
        fontSize: 15,
        color: '#3E3E3E',
    },
});

export default BaggageItem;
