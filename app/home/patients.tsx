import { View, Text, StyleSheet } from 'react-native';

export default function patients() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Paciente!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
});