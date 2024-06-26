import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../services/userService';
import useSession from '../hooks/useSession';

const LoginScreen = ({ navigation }) => {
    const { createSession } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Por favor, preencha ambos os campos');
            return;
        }

        try {
            const data = await login(email, password);
            if (!data?.id || !data?.token || !data?.role) {
                throw new Error('Dados de login inválidos');
            }

            await createSession(Number(data.id), data.token, Number(data.role));
            Alert.alert('Login bem-sucedido');

            const targetScreen = Number(data.role) == 3 ? 'BaggageMain' : 'UserMain';
            navigation.navigate(targetScreen);
        } catch (error) {
            Alert.alert('Erro ao efetuar o login, tente novamente mais tarde.');
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
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}> Cadastre-se</Text>
                </TouchableOpacity>
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
        color: "#A1BBFF",
    }
});

export default LoginScreen;
