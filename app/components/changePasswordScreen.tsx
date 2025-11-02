import { useState } from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Dimensions} from 'react-native';
import { useRouter } from 'expo-router';
import {  LockIcon, CheckIcon } from './Icons';
import Header from './Header';


const { width } = Dimensions.get('window');


const ChangePasswordScreen = () => {
    const navigation = useRouter();
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const handleEnviar = () => {
        if (!newPassword || !confirmPassword) {
            // feedback visual(por enqto)
            console.warn('Por favor, preencha ambos os campos.');
            return;
        }
        if (newPassword !== confirmPassword) {
            console.warn('As senhas não coincidem.');
            return;
        }
        //(simulando api)
        console.log('Enviando nova senha...');
        // ...
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title ="Alterar Senha" />
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Container para evitar que o teclado cubra os inputs */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {/* ScrollView permite que a tela role em dispositivos menores */}
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    
                    {/* 2. Conteúdo Principal */}
                    <View style={styles.mainContent}>

                        <View style={styles.iconContainer}>
                            <LockIcon />
                        </View>

                        {/* Título e Subtítulo */}
                        <Text style={styles.title}>Escolha nova senha</Text>
                        <Text style={styles.subtitle}>
                            A senha nova deve ser diferente da senha anterior
                        </Text>

                        {/* 3. Formulário */}
                        <View style={styles.form}>
                            <Text style={styles.label}>Nova Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="********"
                                placeholderTextColor="#9A9A9A"
                                secureTextEntry
                                value={newPassword}
                                onChangeText={setnewPassword}
                                autoCapitalize="none"
                            />

                            <Text style={styles.label}>Confirmar Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="********"
                                placeholderTextColor="#9A9A9A"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setconfirmPassword}
                                autoCapitalize="none"
                            />
                        </View>

                        {/* 4. Requisitos da Senha */}
                        <View style={styles.requirementsContainer}>
                            <View style={styles.requirementItem}>
                                <CheckIcon />
                                <Text style={styles.requirementText}>
                                    Deve possuir pelo menos 8 caracteres
                                </Text>
                            </View>
                            <View style={styles.requirementItem}>
                                <CheckIcon />
                                <Text style={styles.requirementText}>
                                    Deve conter um caractere especial
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Spacer*/}
                    <View style={styles.flexSpacer} />

                    {/* 5. Botão de Enviar */}
                    <TouchableOpacity style={styles.button} onPress={handleEnviar}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    headerSpacer: {
        width: 28,
    },

    mainContent: {
        alignItems: 'center',
        width: '100%',
    },
    iconContainer: {
        width: 72,
        height: 72,
        borderRadius: 16,
        backgroundColor: '#F0EEFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        maxWidth: width * 0.7,
        marginBottom: 32,
        lineHeight: 20,
    },

    form: {
        width: '100%',
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#444444',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        width: '100%',
        height: 52,
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        marginBottom: 16,
        color: '#333',
    },

    requirementsContainer: {
        width: '100%',
        marginBottom: 32,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    requirementText: {
        fontSize: 14,
        color: '#555555',
        marginLeft: 12,
        flexShrink: 1,
    },

    flexSpacer: {
        flex: 1,
        minHeight: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#6A5AED',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default ChangePasswordScreen;