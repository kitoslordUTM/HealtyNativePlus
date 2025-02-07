import { useState } from "react";
import { useRouter } from "expo-router";
import { useSignUpMutation } from "@/src/services/auth.service";
import { User } from "@/src/models/auth.model";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useDispatch } from "react-redux";
import { setUserId } from "@/view/Login/AuthSlice";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

 


export default function Auth() {
  const router = useRouter();
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch()

  const handleRegister = async () => {
    try {
      const response = await signUp(credentials).unwrap(); // Respuesta con user.id
      console.log("Usuario registrado:", response);
  
      if (response.user && response.user.id) {
        dispatch(setUserId(response.user.id))
        const userId = response.user.id; // Ahora puedes acceder a user.id
        console.log("User ID:", userId);
  
        // Realiza la operación que necesitas con el userId
        setSuccessMessage("Cuenta creada exitosamente");
        setTimeout(() => router.push("./RegistrerMedic"), 1500);
      }
    } catch (err) {
      console.error("Error en el registro:", err);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Botón para regresar al Login */}
      <TouchableOpacity onPress={() => router.push("")} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <Card className="p-5 rounded-lg max-w-[400px] m-4 h-auto bg-[#F0F8FF] shadow-lg">
        <Heading size="2xl" className="text-center mb-4 text-[#007AFF]">
          Crear Cuenta
        </Heading>
        <VStack className="mb-6 space-y-3">
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={credentials.email}
            onChangeText={(text) => setCredentials({ ...credentials, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={credentials.password}
            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          />
        </VStack>

        {error && <Text className="text-red-500 text-center mb-2">Error en el registro</Text>}
        {successMessage && <Text className="text-green-600 text-center mb-2">{successMessage}</Text>}

        <Button onPress={handleRegister} className="px-4 py-2 rounded-xl bg-[#007AFF]" disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <ButtonText size="sm" className="text-white">Registrarse</ButtonText>}
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    width: "100%",
  },
});
