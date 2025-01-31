import { View, Text, StyleSheet, Image } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Image
        className="mb-6 h-[100px] w-[100px] rounded-xl aspect-[4/3]"
        source={require('@/assets/image.png')}
      /> 
      <Text style={styles.title}>Bienvenido a Home!</Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
  image: { 
    height: 200,
    width: 200
   }
});