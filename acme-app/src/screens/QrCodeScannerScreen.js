import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { getBaggageById, getBaggageByTag, updateBaggageWithTracker } from '../services/baggageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QrCodeScannerScreen = ({ navigation }) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            setLoggedUserId(Number(userId));
        };

        fetchUserId();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Precisamos da sua permissão para acessar a câmera</Text>
                <Button onPress={requestPermission} title="Conceder permissão" />
            </View>
        );
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        if (scanned) return;

        setScanned(true);
        try {
            const baggage = await getBaggageByTag(data);
            if (baggage.userId !== loggedUserId) {
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
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            >
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: 400,
        maxHeight: 400,
    },
    camera: {
        flex: 1,
    }
});

export default QrCodeScannerScreen;