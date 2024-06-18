import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManagerBaggageScreen = ({ navigation }) => {
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateLocation = async () => {
        try {
            setLoading(true);
            await AsyncStorage.setItem('location', location);
            await AsyncStorage.setItem('status', status);
            setLoading(false);
            navigation.navigate('ManagerQrCodeScreen');
        } catch (e) {
            setError('Erro ao salvar dados, tente novamente mais tarde.');
            setLoading(false);
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

    const statusOptions = [
        { label: 'EM ANALISE DE SEGURANCA', value: 'EM_ANALISE_DE_SEGURANCA' },
        { label: 'REPROVADA PELA ANALISE DE SEGURANCA', value: 'REPROVADA_PELA_ANALISE_DE_SEGURANCA' },
        { label: 'APROVADA PELA ANALISE DE SEGURANCA', value: 'APROVADA_PELA_ANALISE_DE_SEGURANCA' },
        { label: 'NA AERONAVE', value: 'NA_AERONAVE' },
        { label: 'AGUARDANDO RECOLETA', value: 'AGUARDANDO_RECOLETA' },
    ];

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/acmelogo.png')} style={styles.logo} />
            <Text style={styles.welcomeText}>BEM-VINDO(A) AO ACME APP</Text>
            <Text style={styles.instructionText}>Por favor, selecione o status e insira sua localização atual:</Text>
            <View style={styles.dropdownContainer}>
                <RNPickerSelect
                    onValueChange={(value) => setStatus(value)}
                    items={statusOptions}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Selecione o status', value: null }}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Localização Atual"
                value={location}
                onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateLocation}>
                <Text style={styles.buttonText}>Ler QR code</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#367CFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    instructionText: {
        fontSize: 18,
        color: '#a9a9a9',
        marginBottom: 20,
        textAlign: 'center',
    },
    dropdownContainer: {
        width: '100%',
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#367CFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        backgroundColor: '#fff',
        paddingRight: 30, 
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        backgroundColor: '#fff',
        paddingRight: 30, 
    },
});

export default ManagerBaggageScreen;
