import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon } from './Icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Header({ title }: { title: string }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <BackArrowIcon />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 24 }} /> {/* placeholder pra centralizar o título */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 16,
    height: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
