import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { useSignInMutation } from "@/src/services/auth.service";
import { useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

export default function Login() {
  const router = useRouter();
  const [signIn, { isLoading, error }] = useSignInMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    console.log("Enviando credenciales:", credentials);
    try {
      await signIn(credentials).unwrap();
      router.push("/home");
    } catch (err) {
      console.error("Error de autenticación", err);
    }
  };

  return (
    <Card className="p-5 rounded-lg max-w-[400px] m-4 h-auto bg-[#F8F8F8]">
      <View className="items-center mb-6">
        <Image
          source={require("@/assets/login.png")}
          className="h-[150px] w-[150px] rounded-full"
          alt="image"
          resizeMode="contain"
        />
      </View>
      <Heading size="2xl" className="text-center mb-4">
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
      <Button onPress={handleLogin} className="px-4 py-2 mb-4 rounded-xl bg-[#007AFF]" disabled={isLoading}>
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
        <Image source={require("@/assets/googleLogo.png")} style={style.image} />
        <ButtonText size="sm" className="text-typography-600 ml-2">
          Iniciar sesión con Google
        </ButtonText>
      </Button>
      <View className="flex-row justify-center gap-1">
        <Text>¿No tienes una cuenta?</Text>
        <Text bold={true} className="text-[#007AFF]">
          Regístrate
        </Text>
      </View>
    </Card>
  );
}

const style = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
