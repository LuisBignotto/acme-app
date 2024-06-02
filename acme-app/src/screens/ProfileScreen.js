import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getUserProfile } from '../services/userService';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUserProfile();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>BEM-VINDO(A) AO ACME APP</Text>
                <Text style={styles.subtitle}>Sua bagagem está mais segura com a gente!</Text>
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.baggageTitle}>Suas Bagagens</Text>
                {userData.baggages.length === 0 ? (
                    <View style={styles.noBaggage}>
                        <Text>Você ainda não possui nenhuma mala</Text>
                    </View>
                ) : (
                    userData.baggages.map((baggage, index) => (
                        <View key={baggage.id} style={styles.baggageItem}>
                            <Icon name="suitcase" size={24} color="#367CFF" style={styles.baggageIcon} />
                            <Text style={styles.txtBaggage}>Mala {index + 1}</Text>
                            <Text style={styles.txtBaggageSec}>Status: {baggage.status.status}</Text>
                        </View>
                    ))
                )}
            </View>
            <View style={styles.helpContainer}>
                <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('Support')}>
                    <Text style={styles.helpButtonText}>Precisa de ajuda?</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 70,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#367CFF',
    },
    subtitle: {
        fontSize: 16,
        color: '#89AAFF',
    },
    mainContainer: {
        marginTop: '10%',
        width: '100%',
        paddingHorizontal: 22,
    },
    baggageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 14,
    },
    noBaggage: {
        alignItems: 'center',
        backgroundColor: '#636363',
        padding: 20,
        borderRadius: 10,
    },
    baggageItem: {
        backgroundColor: 'rgba(54, 124, 255, 0.42)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
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
    helpContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    helpButton: {
        backgroundColor: '#367CFF',
        padding: 10,
        borderRadius: 5,
    },
    helpButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
    },
});

export default ProfileScreen;
