import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LockIcon, CheckIcon } from './Icons';
import Header from './Header';

const { width } = Dimensions.get('window');

export default function ChangePasswordScreen() {
  const navigation: any = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEnviar = () => {
    if (!newPassword || !confirmPassword) {
      console.warn('Por favor, preencha ambos os campos.');
      return;
    }
    if (newPassword !== confirmPassword) {
      console.warn('As senhas não coincidem.');
      return;
    }

    console.log('Senha alterada com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Alterar Senha" />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}><LockIcon /></View>
            <Text style={styles.title}>Escolha nova senha</Text>
            <Text style={styles.subtitle}>A senha nova deve ser diferente da senha anterior</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Nova Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#9A9A9A"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
              />
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#9A9A9A"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.requirementsContainer}>
              <View style={styles.requirementItem}>
                <CheckIcon />
                <Text style={styles.requirementText}>Deve possuir pelo menos 8 caracteres</Text>
              </View>
              <View style={styles.requirementItem}>
                <CheckIcon />
                <Text style={styles.requirementText}>Deve conter um caractere especial</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, padding: 24 },
  mainContent: { alignItems: 'center', width: '100%' },
  iconContainer: { 
    width: 72, 
    height: 72, 
    borderRadius: 16, 
    backgroundColor: '#F0EEFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 24 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333333', marginBottom: 8 },
  subtitle: { 
    fontSize: 14, 
    color: '#666666', 
    textAlign: 'center', 
    maxWidth: width * 0.7, 
    marginBottom: 32, 
    lineHeight: 20 
  },
  form: { width: '100%', marginBottom: 24 },
  label: { fontSize: 14, color: '#444444', marginBottom: 8, fontWeight: '500' },
  input: { 
    width: '100%', 
    height: 52, 
    backgroundColor: '#FAFAFA', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    fontSize: 16, 
    borderColor: '#E8E8E8', 
    borderWidth: 1, 
    marginBottom: 16, 
    color: '#333' 
  },
  requirementsContainer: { width: '100%', marginBottom: 32 },
  requirementItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  requirementText: { fontSize: 14, color: '#555555', marginLeft: 12, flexShrink: 1 },
  button: { 
    width: '100%', 
    height: 50, 
    backgroundColor: '#6A5AED', 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 16 
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
