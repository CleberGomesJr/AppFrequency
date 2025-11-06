import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeTeacherScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Olá 👋</Text>
                    <Text style={styles.name}>Professor(a) Silva</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileProf')}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person-circle-outline" size={50} color="#8B5CF6" />
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={[styles.subtitle, { marginTop: 40 }]}>
                Área do Professor
            </Text>

            <View style={styles.cards}>
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#D1FAE5' }]}
                    onPress={() => navigation.navigate('Classes')}>
                    <Ionicons name="people-outline" size={40} color="#10B981" />
                    <Text style={styles.cardText}>Turmas</Text>
                </TouchableOpacity>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.smallCard, { backgroundColor: '#FEEBC3' }]}
                        onPress={() => navigation.navigate('ProfNotifications')}>
                        <Ionicons name="notifications-outline" size={32} color="#F59E0B" />
                        <Text style={styles.cardText}>Notificações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.smallCard, { backgroundColor: '#DBEAFE' }]}
                        onPress={() => navigation.navigate('ProfCalendar')}>
                        <Ionicons name="calendar-outline" size={32} color="#3B82F6" />
                        <Text style={styles.cardText}>Calendário</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 25,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: { fontSize: 18, color: '#444' },
    name: { fontSize: 16, fontWeight: 'bold', color: '#222' },
    subtitle: { marginTop: 20, fontSize: 18, fontWeight: '500', color: '#333' },
    cards: { marginTop: 20 },
    card: {
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
    smallCard: {
        flex: 1,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cardText: { marginTop: 8, fontSize: 14, fontWeight: '600', color: '#333' },
    avatarContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#EDE9FE', // leve roxo
        padding: 2,
    },
});
