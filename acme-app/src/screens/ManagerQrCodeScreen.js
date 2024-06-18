import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBaggageByTag, updateBaggageWithTracker } from '../services/baggageService';
import { useUserContext } from '../contexts/UserContext';

const ManagerQrCodeScreen = ({ navigation }) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState(false);
    const { user } = useUserContext();

    const statusIdMap = {
        'EM_ANALISE_DE_SEGURANCA': 2,
        'REPROVADA_PELA_ANALISE_DE_SEGURANCA': 3,
        'APROVADA_PELA_ANALISE_DE_SEGURANCA': 4,
        'NA_AERONAVE': 5,
        'AGUARDANDO_RECOLETA': 6,
    };

    const clearAsyncStorage = async () => {
        await AsyncStorage.removeItem('location');
        await AsyncStorage.removeItem('status');
    };

    useEffect(() => {
        const fetchData = async () => {
            const location = await AsyncStorage.getItem('location');
            const status = await AsyncStorage.getItem('status');
        };

        fetchData();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Precisamos da sua permissão para acessar a câmera</Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Conceder permissão</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        if (scanned) return;

        setScanned(true);
        try {
            const baggage = await getBaggageByTag(data);
            const location = await AsyncStorage.getItem('location');
            const status = await AsyncStorage.getItem('status');

            const updatedBaggage = {
                ...baggage,
                lastLocation: location,
                status: {
                    id: statusIdMap[status],
                    status: status,
                },
            };

            await updateBaggageWithTracker(baggage.id, updatedBaggage);
            Alert.alert('Sucesso', 'Bagagem atualizada com sucesso!');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    const toggleFlash = () => {
        setFlash(!flash);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { clearAsyncStorage(); navigation.goBack(); }}>
                    <Icon name="arrow-left" size={24} color="#367CFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Leitor de QR Code</Text>
            </View>
            <View style={styles.cameraContainer}>
                <View style={styles.cameraBox}>
                    <CameraView
                        style={styles.camera}
                        facing={facing}
                        enableTorch={flash}
                        onBarcodeScanned={handleBarCodeScanned}
                        barcodeScannerSettings={{
                            barcodeTypes: ['qr'],
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                    <Icon name="lightbulb-o" size={24} color="#fff" />
                    <Text style={styles.flashButtonText}>
                        {flash ? 'Desativar Flash' : 'Ativar Flash'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginTop: 30,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#367CFF',
        marginLeft: 10,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraBox: {
        width: 350,
        height: 450,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    permissionButtonText: {
        color: '#367CFF',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    flashButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#367CFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    flashButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default ManagerQrCodeScreen;
