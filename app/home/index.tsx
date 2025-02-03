import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function HomeScreen() {

  const router = useRouter();

  const handleLogin = () => {
    router.replace('/app')
  }


  return (
    <View style={styles.container}>

      <Image
        className="mb-6 h-[100px] w-[100px] rounded-xl aspect-[4/3]"
        source={require('@/assets/image.png')}
      /> 
      <Text style={styles.title}>Bienvenido a Home!</Text>

      
      <Button onPress={handleLogin} >
        Login
      </Button>

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