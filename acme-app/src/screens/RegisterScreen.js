import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { register, login } from '../services/userService';
import useSession from '../hooks/useSession';

const RegisterScreen = ({ navigation }) => {
    const { createSession } = useSession();
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (email && cpf && name && password) {
            try {
                const registerData = await register(email, cpf, name, password);
                const loginData = await login(email, password);
                await createSession(loginData.id, loginData.token, Number(loginData.role));
                Alert.alert('Cadastro bem-sucedido');
                navigation.navigate(loginData.role == 3 ? 'BaggageMain' : 'UserMain');
            } catch (error) {
                Alert.alert("Erro ao efetuar o cadastro, tente novamente mais tarde.");
            }
        } else {
            Alert.alert('Por favor, preencha todos os campos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.welcomeText}>Crie sua conta no ACME App</Text>
            <Input
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Input
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
            />
            <Input
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Cadastrar" onPress={handleRegister} />
            <View style={styles.loginContainer}>
                <Text style={styles.notRegisterText}>Já possui cadastro?</Text>
                <Text
                    style={styles.loginText}
                    onPress={() => navigation.navigate('Login')}
                > Entrar</Text>
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
    loginContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    notRegisterText: {
        fontSize: 12,
        color: "#636363"
    },
    loginText: {
        fontSize: 12,
        color: "#A1BBFF",
        textDecorationLine: 'underline',
    }
});

export default RegisterScreen;
