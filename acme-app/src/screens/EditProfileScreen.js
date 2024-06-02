import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { getUserProfile, updateUserProfile } from '../services/userService';

const EditProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUserProfile();
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
                setUserId(data.id);
            } catch (error) {
                Alert.alert('Erro', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdate = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        if (password && password.length < 8) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres');
            return;
        }

        try {
            const updatedData = {
                email,
                phone,
                password,
                address,
            };
            await updateUserProfile(userId, updatedData);
            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            navigation.navigate('Profile');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.label}>Telefone</Text>
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
            />
            <Text style={styles.label}>Nova Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Text style={styles.label}>Rua</Text>
            <TextInput
                style={styles.input}
                placeholder="Rua"
                value={address.street}
                onChangeText={(text) => setAddress({ ...address, street: text })}
            />
            <Text style={styles.label}>Bairro</Text>
            <TextInput
                style={styles.input}
                placeholder="Bairro"
                value={address.neighborhood}
                onChangeText={(text) => setAddress({ ...address, neighborhood: text })}
            />
            <Text style={styles.label}>CEP</Text>
            <TextInput
                style={styles.input}
                placeholder="CEP"
                value={address.zipcode}
                onChangeText={(text) => setAddress({ ...address, zipcode: text })}
            />
            <Text style={styles.label}>Número</Text>
            <TextInput
                style={styles.input}
                placeholder="Número"
                value={address.number}
                onChangeText={(text) => setAddress({ ...address, number: text })}
            />
            <Text style={styles.label}>Complemento</Text>
            <TextInput
                style={styles.input}
                placeholder="Complemento"
                value={address.complement}
                onChangeText={(text) => setAddress({ ...address, complement: text })}
            />
            <Text style={styles.label}>Cidade</Text>
            <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={address.city}
                onChangeText={(text) => setAddress({ ...address, city: text })}
            />
            <Text style={styles.label}>Estado</Text>
            <TextInput
                style={styles.input}
                placeholder="Estado"
                value={address.state}
                onChangeText={(text) => setAddress({ ...address, state: text })}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginBottom: 5,
        fontWeight: 'bold',
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
    button: {
        backgroundColor: '#367CFF',
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
