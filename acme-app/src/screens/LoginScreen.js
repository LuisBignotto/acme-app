import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../services/userService';

import useSession from '../hooks/useSession';


const LoginScreen = ({ navigation }) => {
    const { createSession } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email && password) {
            try {
                const data = await login(email, password);

                await createSession(null, data.token, null);

                Alert.alert('Login bem-sucedido');
                navigation.navigate('Main');
            } catch (error) {
                Alert.alert("Erro ao efetuar o login, tente novamente mais tarde.");
            }
        } else {
            Alert.alert('Por favor, preencha ambos os campos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.welcomeText}>Seja bem-vindo ao ACME App</Text>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Input
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={handleLogin} />
            <View style={styles.registerContainer}>
                <Text style={styles.notRegisterText}>Não possui cadastro?</Text>
                <Text style={styles.registerText}> Cadastre-se</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 14,
        marginBottom: 20,
        color: "#367CFF"
    },
    title: {
        fontSize: 24,
        fontWeight: "semibold",
        marginBottom: 20,
        color: "#367CFF"
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    notRegisterText: {
        fontSize: 12,
        color: "#636363"
    },
    registerText: {
        fontSize: 12,
        color: "#A1BBFF"
    }
});

export default LoginScreen;
