import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert,
  Platform, KeyboardAvoidingView, ScrollView, Modal
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!email || !password || !role) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (role === 'aluno') navigation.navigate('AlunoTabs');
    else if (role === 'professor') navigation.navigate('ProfessorTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Controle <Text style={styles.titleHighlight}>Frequência</Text>
            </Text>
            <Text style={styles.subtitle}>Login</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="emailexemplo@gmail.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="*********"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff color="#6b7280" size={20} /> : <Eye color="#6b7280" size={20} />}
                </TouchableOpacity>
              </View>
            </View>

            {/* Campo personalizado que abre modal */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Entrar como</Text>
              <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
                <Text style={[styles.pickerButtonText, !role && { color: '#9ca3af' }]}>
                  {role ? (role === 'aluno' ? 'Aluno' : 'Professor') : 'Selecione'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de seleção */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecionar tipo de usuário</Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setRole('aluno');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Aluno</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setRole('professor');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Professor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1f2937', textAlign: 'center' },
  titleHighlight: { color: '#4f46e5' },
  subtitle: { fontSize: 24, fontWeight: '600', color: '#374151', marginTop: 24 },
  form: { width: '100%' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 },
  input: {
    height: 50, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8,
    paddingHorizontal: 16, backgroundColor: '#f9fafb', fontSize: 16, color: '#111827',
  },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  passwordInput: { flex: 1 },
  eyeIcon: { position: 'absolute', right: 16, height: '100%', justifyContent: 'center' },

  pickerButton: {
    height: 50, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8,
    backgroundColor: '#f9fafb', justifyContent: 'center', paddingHorizontal: 16,
  },
  pickerButtonText: { fontSize: 16, color: '#111827' },

  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 20, marginTop: -10 },
  forgotPasswordText: { color: '#4f46e5', fontWeight: '500' },
  button: {
    backgroundColor: '#4f46e5', paddingVertical: 16, borderRadius: 8,
    alignItems: 'center', marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff', borderRadius: 12, width: '80%', paddingVertical: 24, paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 20, textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', alignItems: 'center',
  },
  modalOptionText: { fontSize: 16, color: '#111827' },
});
