import { useState } from "react";
import { useRouter } from "expo-router";
import { useSignUpMutation } from "@/src/services/auth.service";
import { ActivityIndicator, View, TextInput, TouchableOpacity } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useDispatch } from "react-redux";
import { setUserId } from "@/view/Login/AuthSlice";
import { Heading } from "@/components/ui/heading";

export default function Auth() {
  const router = useRouter();
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const response = await signUp(credentials).unwrap();
      if (response.user && response.user.id) {
        dispatch(setUserId(response.user.id));
        setSuccessMessage("Cuenta creada exitosamente");
        setTimeout(() => router.push("./RegistrerMedic"), 1500);
      }
    } catch (err) {
      console.error("Error en el registro:", err);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#0A1F44] p-4 sm:p-10">
      <TouchableOpacity onPress={() => router.push("")} className="absolute top-6 left-4 sm:top-10 sm:left-10">
        <Text className="text-white text-lg">← </Text>
      </TouchableOpacity>

      <Card className="p-6 rounded-3xl w-full max-w-md bg-white shadow-lg">
        <Heading className="text-center text-2xl font-bold text-[#0A1F44] mb-4">
          Registrate
        </Heading>
     
        <TextInput
          className="w-full p-3 border rounded-xl border-gray-300 mb-3 bg-gray-100"
          placeholder="Correo electrónico"
          value={credentials.email}
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
        <View className="relative w-full">
          <TextInput
            className="w-full p-3 pr-12 border rounded-xl border-gray-300 mb-3 bg-gray-100"
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={credentials.password}
            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4"
          >
            <Text className="text-[#007AFF] text-sm font-bold">{showPassword ? "Ocultar" : "Ver"}</Text>
          </TouchableOpacity>
        </View>

        {error && <Text className="text-red-500 text-center mb-2">Error en el registro</Text>}
        {successMessage && <Text className="text-green-600 text-center mb-2">{successMessage}</Text>}

        <Button onPress={handleRegister} className="w-full p-3 rounded-xl bg-[#007AFF] mt-4" disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <ButtonText className="text-white text-lg">CREAR CUENTA</ButtonText>}
        </Button>
      </Card>
    </View>
  );
}
