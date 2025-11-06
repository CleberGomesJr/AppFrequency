import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }: any) {
    const notifications = [
        {
            text: '📣 Chamada aberta para a aula de Engenharia de Software. 23 alunos ainda não registraram presença.',
            date: 'Hoje às 9:42'
        },
        {
            text: '✅ Todos os alunos confirmaram presença na aula de Programação Web II.',
            date: 'Ontem às 15:30'
        },
        {
            text: '⚠️ Alerta: 3 alunos estão próximos do limite de faltas na disciplina Banco de Dados I.',
            date: 'Última quarta-feira às 11:20'
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Notificações</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {notifications.map((item, index) => (
                    <View key={index} style={styles.notification}>
                        <Ionicons name="information-circle-outline" size={24} color="#4B5563" />
                        <View style={styles.notificationText}>
                            <Text style={styles.text}>{item.text}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingTop: 60,
        paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    back: {
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#111827',
    },
    notification: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationText: {
        marginLeft: 10,
        flex: 1
    },
    text: {
        fontSize: 14,
        color: '#111827',
    },
    date: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4
    },
});