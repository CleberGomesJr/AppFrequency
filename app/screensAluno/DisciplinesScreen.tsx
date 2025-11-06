import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DisciplinesScreen({ navigation }: any) {
    const data = [
        { name: 'Cultura Religiosa', color: '#EC4899', percent: 5 },
        { name: 'Gerência de Projeto de Software', color: '#FACC15', percent: 15 },
        { name: 'Desenvolvimento de Aplicações Móveis', color: '#06B6D4', percent: 20 },
        { name: 'CL1', color: '#A3E635', percent: 25 },
        { name: 'CL3', color: '#EC4899', percent: 0 },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Disciplinas</Text>
            </View>

            {data.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.item}
                    onPress={() => navigation.navigate('DisciplineDetail', { discipline: item })}
                >
                    <View style={[styles.colorBar, { backgroundColor: item.color }]} />
                    <View style={styles.content}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <Text
                        style={[
                            styles.faltas,
                            { color: item.percent >= 20 ? 'red' : '#666' },
                        ]}
                    >
                        Faltas {item.percent}%
                    </Text>
                </TouchableOpacity>
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
    title: { fontSize: 22, fontWeight: 'bold' },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    colorBar: { width: 5, height: '100%' },
    content: { flex: 1, paddingVertical: 15, paddingHorizontal: 10 },
    name: { fontSize: 16 },
    faltas: { fontSize: 14, marginRight: 10 },
});