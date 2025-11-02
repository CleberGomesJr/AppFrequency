import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Platform, KeyboardAvoidingView, ScrollView, } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        if (!email || !password || !role) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        console.log({ email, password, role });
        Alert.alert('Sucesso!');
    };

    return (

        <SafeAreaView style={styles.container}> 
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Controle <Text style={styles.titleHighlight}>Frequência</Text>
                        </Text>
                        <Text style={styles.subtitle}>Entrar</Text>
                    </View>

                    <View style={styles.form}>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="emailexemplo@gmail.com"
                                placeholderTextColor="#9ca3af"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.input, styles.passwordInput]}
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="*********"
                                    placeholderTextColor="#9ca3af"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff color="#6b7280" size={20} />
                                    ) : (
                                        <Eye color="#6b7280" size={20} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Entrar como</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={role}
                                    onValueChange={(itemValue: any) => setRole(itemValue)}
                                    style={styles.picker}
                                    dropdownIconColor="#6b7280">
                                    <Picker.Item label="Selecione" value="" enabled={false} style={styles.pickerItemPlaceholder} />
                                    <Picker.Item label="Aluno" value="aluno" style={styles.pickerItem} />
                                    <Picker.Item label="Professor" value="professor" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.forgotPasswordContainer}>
                            <TouchableOpacity>
                                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
    },
    titleHighlight: {
        color: '#4f46e5',
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#374151',
        marginTop: 24,
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f9fafb',
        fontSize: 16,
        color: '#111827',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        height: '100%',
        justifyContent: 'center',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        backgroundColor: '#f9fafb',
        justifyContent: 'center',
        height: 50,
    },
    picker: {
        width: '100%',
        color: '#111827',
    },
    pickerItemPlaceholder: {
        color: '#9ca3af',
    },
    pickerItem: {
        color: '#111827',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
        marginTop: -10,
    },
    forgotPasswordText: {
        color: '#4f46e5',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#4f46e5',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});