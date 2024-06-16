import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getBaggageByTag, updateBaggageWithTracker } from '../services/baggageService';
import { useUserContext } from '../contexts/UserContext';

const QrCodeScannerScreen = ({ navigation }) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const { user } = useUserContext();

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
            if (baggage.userId !== user.userId) {
                const updatedBaggage = {
                    ...baggage,
                    trackers: [
                        ...baggage.trackers,
                        { trackerUserId: user.userId }
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#367CFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Leitor de QR Code</Text>
            </View>
            <View style={styles.cameraContainer}>
                <View style={styles.cameraBox}>
                    <CameraView
                        style={styles.camera}
                        facing={facing}
                        onBarcodeScanned={handleBarCodeScanned}
                        barcodeScannerSettings={{
                            barcodeTypes: ['qr'],
                        }}
                    />
                </View>
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
});

export default QrCodeScannerScreen;
