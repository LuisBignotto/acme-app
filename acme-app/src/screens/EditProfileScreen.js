import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { useUserContext } from '../contexts/UserContext';
import useSession from '../hooks/useSession';

const EditProfileScreen = ({ navigation }) => {
    const { user, isLoading: userLoading } = useUserContext();
    const { deleteSession } = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState({
        street: '',
        neighborhood: '',
        zipcode: '',
        number: '',
        complement: '',
        city: '',
        state: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUserProfile();
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address || {
                    street: '',
                    neighborhood: '',
                    zipcode: '',
                    number: '',
                    complement: '',
                    city: '',
                    state: ''
                });
            } catch (error) {
                Alert.alert('Erro', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (!userLoading) {
            fetchUserProfile();
        }
    }, [userLoading]);

    const handleUpdate = async () => {
        if (password && password.length < 8) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres');
            return;
        }

        try {
            const updatedData = {
                name,
                email,
                phone,
                password,
                address,
            };
            await updateUserProfile(user.userId, updatedData);
            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            navigation.navigate('Profile');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    if (loading || userLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const logout = async () => {
        await deleteSession();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            
            <View style={styles.section}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Nova Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <Text style={styles.sectionTitle}>Endereço</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Rua</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rua"
                    value={address.street}
                    onChangeText={(text) => setAddress({ ...address, street: text })}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Bairro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Bairro"
                    value={address.neighborhood}
                    onChangeText={(text) => setAddress({ ...address, neighborhood: text })}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>CEP</Text>
                <TextInput
                    style={styles.input}
                    placeholder="CEP"
                    value={address.zipcode}
                    onChangeText={(text) => setAddress({ ...address, zipcode: text })}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Número</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número"
                    value={address.number}
                    onChangeText={(text) => setAddress({ ...address, number: text })}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Complemento</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Complemento"
                    value={address.complement}
                    onChangeText={(text) => setAddress({ ...address, complement: text })}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    value={address.city}
                    onChangeText={(text) => setAddress({ ...address, city: text })}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Estado</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Estado"
                    value={address.state}
                    onChangeText={(text) => setAddress({ ...address, state: text })}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    section: {
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#367CFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EditProfileScreen;
