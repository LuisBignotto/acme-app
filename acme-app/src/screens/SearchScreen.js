import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
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
            <Text style={styles.title}>Busca por código</Text>
            <Icon name="suitcase" size={100} color="#367CFF" style={styles.icon} />
            <Text style={styles.subtitle}>Buscar mala</Text>
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
            <Button title="Buscar" onPress={handleSearch} />
            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>ou</Text>
                <View style={styles.separatorLine} />
            </View>
            <Button title="Ler QR Code" onPress={() => navigation.navigate('QrCodeScanner')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 80,
    },
    icon: {
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    inputContainer: {
        width: '80%',
        alignItems: 'flex-start',
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
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 16,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
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
});

export default SearchScreen;
