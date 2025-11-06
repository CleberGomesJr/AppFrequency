import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

export default function QRCodeScreen({ navigation }: any) {
    const [code, setCode] = useState('https://exemplo.com/chamada');

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(code);
        Alert.alert('Código copiado!', code);
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <View style={styles.qrArea}>
                <QRCode value={code} size={200} />
            </View>

            <View style={styles.bottomArea}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={code}
                        onChangeText={setCode}
                        placeholder="Inserir código"
                    />
                    <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
                        <Ionicons name="copy-outline" size={24} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Cancelar chamada</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.endButton}
                    onPress={() => navigation.navigate('EndCallScreen')}
                >
                    <Text style={styles.buttonText}>Encerrar chamada</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingTop: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    back: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 6,
    },
    qrArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomArea: {
        width: '90%',
        paddingBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
    },
    iconButton: {
        marginLeft: 10,
    },
    cancelButton: {
        backgroundColor: '#EF4444',
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    endButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
