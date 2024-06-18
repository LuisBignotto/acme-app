import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAllBaggages, updateBaggageStatus } from '../services/baggageService';

const ManageBaggageScreen = ({ navigation }) => {
    const [baggages, setBaggages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBaggages = async () => {
            try {
                const data = await getAllBaggages();
                setBaggages(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBaggages();
    }, []);

    const handleUpdateStatus = async (baggageId, newStatus) => {
        try {
            await updateBaggageStatus(baggageId, newStatus);
            Alert.alert('Sucesso', 'Status da bagagem atualizado com sucesso');
            setBaggages((prevBaggages) =>
                prevBaggages.map((baggage) =>
                    baggage.id === baggageId ? { ...baggage, status: newStatus } : baggage
                )
            );
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerenciar Bagagens</Text>
            <FlatList
                data={baggages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.baggageItem}
                        onPress={() => navigation.navigate('BaggageDetails', { baggage: item })}
                    >
                        <Icon name="suitcase" size={24} color="#367CFF" style={styles.baggageIcon} />
                        <View style={styles.baggageTextContainer}>
                            <Text style={styles.txtBaggage}>Tag: {item.tag}</Text>
                            <Text style={styles.txtBaggageSec}>Status: {item.status}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() => handleUpdateStatus(item.id, 'NEW_STATUS')} // Troque 'NEW_STATUS' pelo status desejado
                        >
                            <Text style={styles.updateButtonText}>Atualizar Status</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#367CFF',
    },
    baggageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F0FE',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
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
        fontSize: 16,
        color: '#3E3E3E',
        marginBottom: 5,
    },
    txtBaggageSec: {
        fontSize: 14,
        color: '#3E3E3E',
    },
    updateButton: {
        backgroundColor: '#367CFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default ManageBaggageScreen;
