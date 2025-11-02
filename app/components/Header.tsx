// Componente Header.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BackArrowIcon } from './Icons';

export default function Header({ title }: { title: string }) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
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
        paddingTop: 40, // espaço seguro para notch
        paddingHorizontal: 16,
        height: 80,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
});
