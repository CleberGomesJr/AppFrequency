import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }: any) {
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Perfil</Text>
            </View>

            <View style={styles.header}>
                <TouchableOpacity style={styles.avatarContainer}>
                    <Ionicons name="person-circle-outline" size={100} color="#fff" />
                </TouchableOpacity>

                {/* Botão de alterar foto */}
                <TouchableOpacity style={styles.changePhotoButton}>
                    <Text style={styles.changeText}>Alterar Foto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text>Nome de Usuário</Text>
                <TextInput style={styles.input} value="Dwayne Johnson" />

                <Text>Email</Text>
                <TextInput style={styles.input} value="emailexemplo@gmail.com" />

                <Text>Número de Celular</Text>
                <TextInput style={styles.input} value="+55 (31) 12345-6789" />

                {/* Botão Confirmar */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>

                {/* Linha inferior com "Sair" e "Trocar Senha" */}
                <View style={styles.bottomButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.logoutText}>Sair da conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                        <Text style={styles.changePasswordText}>Trocar Senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 25,
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        zIndex: 2
    },
    back: { position: 'absolute', left: 25 },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },

    header: {
        backgroundColor: '#8B5CF6',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    },
    changePhotoButton: {
        backgroundColor: '#A78BFA',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 5
    },
    changeText: {
        color: '#fff',
        fontWeight: '500'
    },

    form: { padding: 25 },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#8B5CF6',
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        paddingHorizontal: 5
    },
    logoutText: {
        color: '#6B7280',
        textAlign: 'center'
    },
    changePasswordText: {
        color: '#8B5CF6',
        fontWeight: '500'
    }
});