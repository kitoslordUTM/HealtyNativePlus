import * as Index from './index';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch } from "react-redux";
import { setUserId } from "@/view/Login/AuthSlice";

const {
  useState,
  ActivityIndicator,
  View,
  useSignInMutation,
  useRouter,
  Button,
  ButtonText,
  Card,
  Heading,
  Input,
  InputField,
  VStack,
  Text,
} = Index;

export default function Login() {
  const router = useRouter();
  const [signIn, { isLoading, error }] = useSignInMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await signIn(credentials).unwrap();
      router.push("/home");
      dispatch(setUserId(response.user.id));
    } catch (err) {
      console.error("Error de autenticación", err);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Sección superior con fondo azul oscuro */}
      <View className="bg-[#0A2240] h-1/3 w-full items-center justify-center">
        <Text className="text-white text-9xl font-bold">H+</Text>
        <Text className="text-white text-4xl font-bold mt-6">HEALTHY +</Text>
      </View>
      
      {/* Sección del formulario */}
      <View className="flex-1 items-center justify-center px-6">
        <Card className="p-5 rounded-lg max-w-[400px] w-full shadow-lg">
          <Heading size="xl" className="text-center mb-4 font-bold">
            Hola, Doctor
          </Heading>
          <VStack className="mb-6 space-y-3">
            <Input variant="outline" size="md" className="rounded-xl bg-white">
              <InputField
                placeholder="Correo electrónico"
                value={credentials.email}
                onChangeText={(text) => setCredentials({ ...credentials, email: text })}
              />
            </Input>
            <Input className="rounded-xl bg-white">
              <InputField
                type="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChangeText={(text) => setCredentials({ ...credentials, password: text })}
              />
            </Input>
          </VStack>
          {error && (
            <Text className="text-red-500 text-center mb-2">Credenciales incorrectas</Text>
          )}
          <Button onPress={handleLogin} className="px-4 py-2 mb-4 rounded-xl bg-[#007AFF] w-full" disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ButtonText size="sm" className="text-white">Iniciar Sesión</ButtonText>
            )}
          </Button>
          <View className="flex-row items-center justify-center mb-6">
            <View className="w-1/4 h-[1px] bg-gray-300"></View>
            <Text className="mx-3 text-gray-500">o</Text>
            <View className="w-1/4 h-[1px] bg-gray-300"></View>
          </View>
          <Button variant="outline" className="px-4 py-2 border-outline-300 rounded-xl mb-4 flex-row items-center justify-center">
            <Image source={require("@/assets/googleLogo.png")} style={styles.image} />
            <ButtonText size="sm" className="text-typography-600 ml-2">
              Iniciar sesión con Google
            </ButtonText>
          </Button>
          <View className="flex-row justify-center gap-1">
            <Text>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => router.push("/Auth")}>
              <Text bold={true} className="text-[#007AFF]">Regístrate</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
