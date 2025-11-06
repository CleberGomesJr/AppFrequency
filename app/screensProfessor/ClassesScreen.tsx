import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ClassesScreen({ navigation }: any) {
    const classes = [
        { name: 'Cultura Religiosa', color: '#EC4899' },
        { name: 'Gerência de Projeto de Software', color: '#FACC15' },
        { name: 'Desenvolvimento de Aplicações Móveis', color: '#06B6D4' },
        { name: 'CL1', color: '#A3E635' },
        { name: 'CL3', color: '#EC4899' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Minhas Turmas</Text>
            </View>

            {/* Lista de classes */}
            {classes.map((item, index) => (
                <View key={index} style={styles.item}>
                    <View style={[styles.colorBar, { backgroundColor: item.color }]} />
                    <View style={styles.content}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#8B5CF6' }]}
                            onPress={() => navigation.navigate('QRCodeScreen')}
                        >
                            <Text style={styles.buttonText}>Abrir Chamadas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#10B981' }]}
                            onPress={() => navigation.navigate('EditCallScreen', { className: item.name })}
                        >
                            <Text style={styles.buttonText}>Editar Presença</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6', paddingTop: 60, paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    back: {
        marginRight: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 6,
    },
    title: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    colorBar: { width: 5, height: '100%' },
    content: { flex: 1, paddingHorizontal: 10 },
    name: { fontSize: 16, marginBottom: 10 },
    buttonsContainer: {
        justifyContent: 'space-between',
        height: 80,
        marginLeft: 10
    },
    button: {
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        minWidth: 110,
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
});