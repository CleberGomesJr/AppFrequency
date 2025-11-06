import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ScannerScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permissão para usar a câmera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permissão para câmera negada 😕</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: '#8B5CF6', marginTop: 10 }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Área da câmera */}
      <View style={styles.scannerContainer}>
        <CameraView style={StyleSheet.absoluteFillObject} />

        {/* Moldura */}
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          <View style={styles.middleRow}>
            <View style={styles.sideOverlay} />
            <View style={styles.squareFrame} />
            <View style={styles.sideOverlay} />
          </View>
          <View style={styles.bottomOverlay} />
        </View>
      </View>

      {/* Campo e botão */}
      <TextInput
        style={styles.input}
        placeholder="Inserir código manualmente"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Alert.alert('Presença confirmada!', `Código: ${codigo || 'Nenhum código inserido'}`)
        }
      >
        <Text style={styles.buttonText}>Confirmar presença</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    paddingTop: 60,
  },
  back: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 6,
    zIndex: 10,
  },
  scannerContainer: {
    marginTop: 60,
    width: 300,
    height: 300,
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topOverlay: {
    flex: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideOverlay: {
    flex: 1,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  squareFrame: {
    width: 200,
    height: 200,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 16,
  },
  bottomOverlay: {
    flex: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    padding: 10,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 15,
    paddingVertical: 15,
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});