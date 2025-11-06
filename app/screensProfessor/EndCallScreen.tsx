import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default function EndCallScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Chamada encerrada</Text>
            </View>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'ProfessorTabs' }],
                    })
                }
            >
                <Text style={styles.buttonText}>Voltar para Início</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009440',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    nextButton: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});