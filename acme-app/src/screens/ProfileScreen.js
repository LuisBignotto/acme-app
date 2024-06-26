import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUserProfile } from '../services/userService';
import { getBaggagesTrackedByUser } from '../services/baggageService';
import BaggageItem from '../components/BaggageItem';
import { useUserContext } from '../contexts/UserContext';

const ProfileScreen = ({ navigation }) => {
    const { user } = useUserContext();
    const [userData, setUserData] = useState(null);
    const [trackedBaggages, setTrackedBaggages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserProfile = async () => {
        try {
            const data = await getUserProfile();
            setUserData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchTrackedBaggages = async (userId) => {
        try {
            const data = await getBaggagesTrackedByUser(userId);
            setTrackedBaggages(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const loadData = async () => {
                setLoading(true);
                await fetchUserProfile();
                setLoading(false);
            };
            
            loadData();
        }, [user.userId])
    );

    useEffect(() => {
        if (userData && userData.id) {
            fetchTrackedBaggages(userData.id);
        }
    }, [userData]);

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
            <Image source={require('../../assets/acmelogo.png')} style={styles.logo} />
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>BEM-VINDO(A) AO ACME APP</Text>
                <Text style={styles.subtitle}>Sua bagagem está mais segura com a gente!</Text>
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.baggageTitle}>Suas Bagagens</Text>
                {userData && userData.baggages.length === 0 ? (
                    <View style={styles.noBaggage}>
                        <Text style={styles.noBaggageTxt}>Você não possui nenhuma bagagem.</Text>
                    </View>
                ) : (
                    userData && userData.baggages.map((baggage, index) => (
                        <BaggageItem
                            key={baggage.id}
                            baggage={baggage}
                            index={index}
                            onPress={() => navigation.navigate('BaggageDetails', { baggage })}
                        />
                    ))
                )}
                {trackedBaggages.length > 0 && (
                    <>
                        {trackedBaggages.map((baggage, index) => (
                            <BaggageItem
                                key={baggage.id}
                                baggage={baggage}
                                index={index}
                                onPress={() => navigation.navigate('BaggageDetails', { baggage })}
                            />
                        ))}
                    </>
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
    logo: {
        width: 200,
        height: 200,
    },
    welcomeContainer: {
        alignItems: 'center',
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
        backgroundColor: '#E8F0FE',
        padding: 20,
        borderRadius: 10,
        color: '#367CFF',
    },
    noBaggageTxt: {
        fontSize: 12,
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
