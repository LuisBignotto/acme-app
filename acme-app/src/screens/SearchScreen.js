import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'expo-checkbox';
import Button from '../components/Button';
import { getBaggageByTag, updateBaggageWithTracker } from '../services/baggageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
    const [tag, setTag] = useState('');
    const [keepTrack, setKeepTrack] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            setLoggedUserId(Number(userId));
        };

        fetchUserId();
    }, []);

    const handleSearch = async () => {
        try {
            const baggage = await getBaggageByTag(tag);

            if (keepTrack && baggage.userId !== loggedUserId) {
                const updatedBaggage = {
                    ...baggage,
                    trackers: [
                        ...baggage.trackers,
                        { trackerUserId: loggedUserId }
                    ]
                };
                await updateBaggageWithTracker(baggage.id, updatedBaggage);
            }

            navigation.navigate('BaggageDetails', { baggage });
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <Icon name="search" size={40} color="#367CFF" style={styles.icon} />
                    <Text style={styles.headerText}>Buscar Mala</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Digite a tag da mala para buscar.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Exemplo: 33323-3213211"
                        value={tag}
                        onChangeText={setTag}
                    />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={keepTrack}
                        onValueChange={setKeepTrack}
                        color={keepTrack ? '#367CFF' : undefined}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkboxLabel}>Manter na minha lista de malas</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>ou</Text>
                    <View style={styles.separatorLine} />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QrCodeScanner')}>
                    <Text style={styles.buttonText}>Ler QR Code</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    box: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#367CFF',
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#555',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        fontSize: 16,
        color: '#555',
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: '#367CFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SearchScreen;
