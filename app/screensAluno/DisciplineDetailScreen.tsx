import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configuração do calendário em português
LocaleConfig.locales['pt'] = {
    monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    dayNames: [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
        'Quinta-feira', 'Sexta-feira', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt';

export default function DisciplineDetailScreen({ route, navigation }: any) {
    const { discipline } = route.params || { discipline: { name: 'Cultura Religiosa', percent: 5 } };

    const aulas = ['2025-11-04', '2025-11-05', '2025-11-07', '2025-11-11'];
    const faltas = ['2025-11-05', '2025-11-11'];

    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, []);

    const markedDates = aulas.reduce((acc: any, date) => {
        const isFalta = faltas.includes(date);
        acc[date] = {
            customStyles: {
                container: {
                    backgroundColor: isFalta ? '#FCA5A5' : '#DDD6FE',
                    borderRadius: 10,
                },
                text: {
                    color: isFalta ? '#991B1B' : '#4C1D95',
                    fontWeight: 'bold',
                },
            },
        };
        return acc;
    }, {});

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>{discipline.name}</Text>
            </View>

            {/* Cartão de presença */}
            <View style={styles.box}>
                <Text style={styles.sectionTitle}>Resumo de Presença</Text>
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Ionicons name="book-outline" size={20} color="#8B5CF6" />
                        <Text style={[styles.statValue, { color: '#8B5CF6' }]}>{aulas.length}</Text>
                        <Text style={styles.statLabel}>Aulas</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Ionicons name="close-circle-outline" size={20} color="#DC2626" />
                        <Text style={[styles.statValue, { color: '#DC2626' }]}>{faltas.length}</Text>
                        <Text style={styles.statLabel}>Faltas</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="stats-chart-outline" size={20} color="#10B981" />
                        <Text style={[styles.statValue, { color: '#10B981' }]}>{discipline.percent}%</Text>
                        <Text style={styles.statLabel}>Faltas (%)</Text>
                    </View>
                </View>
            </View>

            {/* Calendário */}
            <View style={styles.calendarBox}>
                <Text style={styles.sectionTitle}>Calendário</Text>
                <Calendar
                    style={styles.calendar}
                    markingType="custom"
                    markedDates={markedDates}
                    theme={{
                        backgroundColor: '#fff',
                        calendarBackground: '#fff',
                        textSectionTitleColor: '#374151',
                        selectedDayBackgroundColor: '#8B5CF6',
                        selectedDayTextColor: '#fff',
                        todayTextColor: '#8B5CF6',
                        dayTextColor: '#111827',
                        textDisabledColor: '#D1D5DB',
                        arrowColor: '#8B5CF6',
                        monthTextColor: '#111827',
                        textDayFontWeight: '500',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '600',
                        textDayFontSize: 16,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 14,
                    }}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6', paddingHorizontal: 20, paddingTop: 40 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
    back: {
        backgroundColor: '#E5E7EB',
        borderRadius: 10,
        padding: 6,
        marginRight: 15,
    },
    title: { fontSize: 22, fontWeight: 'bold', color: '#111827' },

    // Presença
    box: { backgroundColor: '#fff', borderRadius: 20, padding: 15, marginBottom: 20, elevation: 3 },
    sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: '#111827' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    statCard: { alignItems: 'center', flex: 1 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginTop: 3 },
    statLabel: { fontSize: 13, color: '#6B7280' },

    // Calendário
    calendarBox: { flex: 1, marginBottom: 10 },
    calendar: {
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});
