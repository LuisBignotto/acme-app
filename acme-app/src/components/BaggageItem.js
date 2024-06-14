import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BaggageItem = ({ baggage, index, onPress }) => {
    return (
        <TouchableOpacity style={styles.baggageItem} onPress={onPress}>
            <Icon name="suitcase" size={30} color="#367CFF" style={styles.baggageIcon} />
            <View style={styles.baggageTextContainer}>
                <Text style={styles.txtBaggage}>Tag: {baggage.tag}</Text>
                <Text style={styles.txtBaggageSec}>Última Localização: {baggage.lastLocation}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    baggageItem: {
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
    baggageIcon: {
        marginRight: 15,
    },
    baggageTextContainer: {
        flex: 1,
    },
    txtBaggage: {
        fontSize: 12,
        color: '#3E3E3E',
        marginBottom: 5,
    },
    txtBaggageSec: {
        fontSize: 12,
        color: '#3E3E3E',
    },
});

export default BaggageItem;
