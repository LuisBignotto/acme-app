import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteBaggage } from '../services/baggageService';

const BaggageDetailsScreen = ({ route, navigation }) => {
    const { baggage } = route.params;

    const handleCollectBaggage = async () => {
        try {
            await deleteBaggage(baggage.id);
            Alert.alert('Sucesso', 'Bagagem coletada com sucesso.', [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Profile', { refresh: true });
                    },
                },
            ]);
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    const statuses = [
        { id: 1, label: 'Despachada', status: 'DESPACHADA' },
        { id: 2, label: 'Em Análise de Segurança', statuses: ['EM_ANALISE_DE_SEGURANCA', 'REPROVADA_PELA_ANALISE_DE_SEGURANCA', 'APROVADA_PELA_ANALISE_DE_SEGURANCA'] },
        { id: 3, label: 'Na Aeronave', status: 'NA_AERONAVE' },
        { id: 4, label: 'Aguardando Recoleta', status: 'AGUARDANDO_RECOLETA' },
        { id: 5, label: 'Coletada', status: 'COLETADA' },
    ];

    const getStatusStyle = (currentStatus) => {
        let currentIndex = -1;
        statuses.forEach((s, index) => {
            if (s.status === currentStatus || (s.statuses && s.statuses.includes(currentStatus))) {
                currentIndex = index;
            }
        });

        return statuses.map((s, index) => ({
            ...s,
            completed: index <= currentIndex
        }));
    };

    const currentStatusStyles = getStatusStyle(baggage.status.status);

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color="#367CFF" />
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Detalhes da Bagagem</Text>
            <View style={styles.detailContainer}>
                <View style={styles.detailItem}>
                    <Icon name="tag" size={18} color="#367CFF" style={styles.detailIcon} />
                    <Text style={styles.detailText}> Tag: {baggage.tag}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="paint-brush" size={18} color="#367CFF" style={styles.detailIcon} />
                    <Text style={styles.detailText}> Cor: {baggage.color}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="balance-scale" size={18} color="#367CFF" style={styles.detailIcon} />
                    <Text style={styles.detailText}> Peso: {baggage.weight} kg</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="map-marker" size={18} color="#367CFF" style={styles.detailIcon} />
                    <Text style={styles.detailText}> Última Localização: {baggage.lastLocation}</Text>
                </View>
            </View>
            <View style={styles.statusContainer}>
                {currentStatusStyles.map((s) => (
                    <View key={s.id} style={styles.statusItem}>
                        <Icon
                            name="check-circle"
                            size={24}
                            color={s.completed ? '#367CFF' : '#ccc'}
                            style={styles.statusIcon}
                        />
                        <View style={styles.statusTextContainer}>
                            <Text style={styles.statusText}>{s.label}</Text>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.collectContainer}>
                <Text style={styles.collectTitle}>Já coletou sua bagagem?</Text>
                <Text style={styles.collectText}>Clique em confirmar para finalizar.</Text>
                <TouchableOpacity style={styles.collectButton} onPress={handleCollectBaggage}>
                    <Text style={styles.collectButtonText}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        marginLeft: 10,
        color: '#367CFF',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailContainer: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: 'rgba(54, 124, 255, 0.1)',
        borderRadius: 10,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#367CFF',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailIcon: {
        width: 24,
        textAlign: 'center',
    },
    detailText: {
        fontSize: 18,
        marginLeft: 5,
        color: '#333',
    },
    statusContainer: {
        marginBottom: 30,
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statusIcon: {
        marginRight: 10,
    },
    statusTextContainer: {
        flex: 1,
    },
    statusText: {
        fontSize: 18,
        color: '#333',
    },
    collectContainer: {
        alignItems: 'center',
    },
    collectTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    collectText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    collectButton: {
        backgroundColor: '#367CFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    collectButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BaggageDetailsScreen;
