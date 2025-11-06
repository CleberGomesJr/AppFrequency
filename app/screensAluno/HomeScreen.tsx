import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá 👋</Text>
          <Text style={styles.name}>Dwayne Johnson</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileAluno')}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={50} color="#8B5CF6" />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Suas Preferências!</Text>

      <View style={styles.cards}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#E3D7FF' }]}
          onPress={() => navigation.navigate('AlunoScanner')}>
          <Ionicons name="qr-code-outline" size={40} color="#8B5CF6" />
          <Text style={styles.cardText}>Escanear</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.smallCard, { backgroundColor: '#D1FAE5' }]}
            onPress={() => navigation.navigate('AlunoDisciplines')}>
            <Ionicons name="pulse-outline" size={32} color="#10B981" />
            <Text style={styles.cardText}>Disciplinas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallCard, { backgroundColor: '#FEE2E2' }]}
            onPress={() => navigation.navigate('AlunoNotifications')}>
            <Ionicons name="notifications-outline" size={32} color="#F87171" />
            <Text style={styles.cardText}>Notificações</Text>
            <Text style={styles.subtext}>Não Lidas: 32</Text>
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
  subtext: { fontSize: 12, color: '#666' },
  avatarContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#EDE9FE', // leve roxo
    padding: 2,
  },
});