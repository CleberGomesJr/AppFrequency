import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditCallScreen({ navigation, route }: any) {
    const { className } = route.params;

    const [students, setStudents] = useState([
        { id: '1', name: 'Ana Silva', present: false, photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: '2', name: 'Bruno Souza', present: false, photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: '3', name: 'Carla Lima', present: false, photo: 'https://randomuser.me/api/portraits/women/3.jpg' },
    ]);

    const togglePresence = (id: string) => {
        setStudents((prev) =>
            prev.map((s) => (s.id === id ? { ...s, present: !s.present } : s))
        );
    };

    const confirmAttendance = () => {
        const presentStudents = students.filter((s) => s.present).map((s) => s.name);
        Alert.alert('Presença registrada', `Alunos presentes: ${presentStudents.join(', ')}`);
        navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.className}>{className}</Text>
            </View>

            <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.studentItem}
                        onPress={() => togglePresence(item.id)}
                        activeOpacity={0.7}
                    >
                        <Image source={{ uri: item.photo }} style={styles.photo} />
                        <Text style={styles.studentName}>{item.name}</Text>
                        <View style={[styles.checkbox, item.present && styles.checked]}>
                            {item.present && <Ionicons name="checkmark" size={14} color="#fff" />}
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Botão confirmar */}
            <TouchableOpacity
                style={styles.confirmButton}
                onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'ProfessorTabs' }],
                    })
                }
            >
                <Text style={styles.confirmText}>Voltar para Início</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB', paddingTop: 60, paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
    className: { fontSize: 22, fontWeight: 'bold', marginLeft: 12, color: '#111827' },
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 8,
    },
    photo: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
    studentName: { flex: 1, fontSize: 15, color: '#111827' },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#6B7280',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#10B981',
        borderColor: '#10B981',
    },
    confirmButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});