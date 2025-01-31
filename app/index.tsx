import { View } from 'react-native';
import Login from '@/view/Login/Login.View';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/home')
  }

  return (
    <View className="bg-[#031B3E] w-full h-full justify-center items-center">
      <Login 
        handleLogin={ handleLogin}
      />
    </View>
  );
}