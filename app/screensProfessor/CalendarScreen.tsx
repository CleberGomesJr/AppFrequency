import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Easing,
    FlatList,
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
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

export default function TeacherCalendarScreen({ navigation }: any) {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    type ClassItem = { name: string; color: string };

    const schedule: Record<string, ClassItem[]> = {
        '2025-11-04': [
            { name: 'Gerência de Projeto de Software', color: '#FACC15' },
            { name: 'CL1', color: '#A3E635' },
        ],
        '2025-11-05': [
            { name: 'Cultura Religiosa', color: '#EC4899' },
            { name: 'Desenvolvimento de Aplicações Móveis', color: '#06B6D4' },
        ],
        '2025-11-07': [
            { name: 'CL3', color: '#EC4899' },
        ],
    };

    const handleDayPress = (day: any) => {
        const date = day.dateString;
        if (schedule[date]) {
            setSelectedDay(date);
            setModalVisible(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    };

    const closeModal = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            setSelectedDay(null);
        });
    };

    const handleNavigate = (screen: string, params?: any) => {
        closeModal();
        navigation.navigate(screen, params);
    };

    const markedDates = Object.keys(schedule).reduce((acc, date) => {
        acc[date] = {
            customStyles: {
                container: {
                    backgroundColor: '#EDE9FE',
                    borderRadius: 10,
                },
                text: { color: '#4C1D95', fontWeight: 'bold' },
            },
        };
        return acc;
    }, {} as any);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Calendário</Text>
            </View>

            {/* Calendário */}
            <View style={styles.calendarBox}>
                <Calendar
                    style={styles.calendar}
                    onDayPress={handleDayPress}
                    markingType={'custom'}
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

            {/* Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="none"
                onRequestClose={closeModal}
            >
                <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Aulas do dia {selectedDay && selectedDay.split('-').reverse().join('/')}
                        </Text>

                        <FlatList
                            data={selectedDay ? schedule[selectedDay] : []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.classItem}>
                                    <View style={[styles.colorBar, { backgroundColor: item.color }]} />
                                    <View style={styles.classInfo}>
                                        <Text style={styles.className}>{item.name}</Text>
                                    </View>
                                    <View style={styles.buttonColumn}>
                                        <TouchableOpacity
                                            style={[styles.smallButton, { backgroundColor: '#8B5CF6' }]}
                                            onPress={() => handleNavigate('QRCodeScreen')}
                                        >
                                            <Text style={styles.buttonText}>Abrir chamadas</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.smallButton, { backgroundColor: '#10B981' }]}
                                            onPress={() =>
                                                handleNavigate('EditCallScreen', { className: item.name })
                                            }
                                        >
                                            <Text style={styles.buttonText}>Editar presenças</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />

                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Ionicons name="close" size={22} color="#fff" />
                            <Text style={styles.closeText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Modal>
        </View>
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

    // Calendário
    calendarBox: { flex: 1 },
    calendar: {
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '100%',
        padding: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#111827',
        textAlign: 'center',
    },

    // Itens de aula
    classItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        elevation: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    colorBar: { width: 6, height: '100%', borderRadius: 6 },
    classInfo: { flex: 1, paddingHorizontal: 10 },
    className: { fontSize: 16, fontWeight: '600', color: '#111827' },
    buttonColumn: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    smallButton: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 4,
        minWidth: 100,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

    // Botão fechar
    closeButton: {
        backgroundColor: '#EF4444',
        borderRadius: 12,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    closeText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 5 },
});