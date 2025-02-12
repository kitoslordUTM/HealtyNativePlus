import { useState } from "react";
import { useRouter } from "expo-router";
import { useRegisterPatientMutation } from "@/src/services/auth.service";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export default function PatientRegister() {
  const userId = useSelector((state: RootState) => state.authslice.userId);
  const router = useRouter();
  const [registerPatient, { isLoading, error }] = useRegisterPatientMutation();
  const [patient, setPatient] = useState({
    name: "",
    lastname: "",
    age: 0,
    gender: "",
    telephone: 0,
    direction: "",
    condition: "",
    user: userId, // Asigna el ID del usuario
  });

  const handleRegisterPatient = async () => {
    try {
      const response = await registerPatient(patient).unwrap();
      console.log("Paciente registrado:", response);
      router.push("/home");
    } catch (err) {
      console.error("Error al registrar el paciente:", err);
    }
  };

  const handleAgeChange = (text: string) => {
    const age = Number(text);
    if (!isNaN(age)) {
      setPatient({ ...patient, age });
    }
  };

  return (
    <View style={styles.container}>
      <Card className="p-5 rounded-lg max-w-[400px] m-4 h-auto bg-[#F0F8FF] shadow-lg">
        <Heading size="2xl" className="text-center mb-4 text-[#007AFF]">
          Registrar Paciente
        </Heading>
        <VStack className="mb-6 space-y-3">
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={patient.name}
            onChangeText={(text) => setPatient({ ...patient, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={patient.lastname}
            onChangeText={(text) => setPatient({ ...patient, lastname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={patient.age ? patient.age.toString() : ""}
            keyboardType="numeric"
            onChangeText={handleAgeChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Género"
            value={patient.gender}
            onChangeText={(text) => setPatient({ ...patient, gender: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={patient.telephone ? patient.telephone.toString() : ""}
            keyboardType="numeric"
            onChangeText={(text) => setPatient({ ...patient, telephone: Number(text) })}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={patient.direction}
            onChangeText={(text) => setPatient({ ...patient, direction: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Condición médica"
            value={patient.condition}
            onChangeText={(text) => setPatient({ ...patient, condition: text })}
          />
        </VStack>
        {error && <Text className="text-red-500 text-center mb-2">Error al registrar el paciente</Text>}
        <Button onPress={handleRegisterPatient} className="px-4 py-2 rounded-xl bg-[#007AFF]" disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <ButtonText size="sm" className="text-white">Registrar</ButtonText>}
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
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    width: "100%",
  },
});
