import { useState } from "react";
import { useRouter } from "expo-router";
import { useRegisterDoctorMutation } from "@/src/services/auth.service";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export default function MedicRegistrer() {

  const userId = useSelector((state: RootState) => state.authslice.userId);

  const router = useRouter();
  const [registerDoctor, { isLoading, error }] = useRegisterDoctorMutation();
  const [doctor, setDoctor] = useState({
    name: "",
    lastname: "",
    age: 0, // Mantén la edad como número
    speciality: "",
    telephone: "",
    direction: "",
    consultory: "",
    user: userId, // Aquí va el id del usuario
    pacientes: [],
  });

  const handleRegisterDoctor = async () => {
    try {
      const response = await registerDoctor(doctor).unwrap();
      console.log("Doctor registrado:", response);
      router.push("/home"); // Redirige al siguiente paso
    } catch (err) {
      console.error("Error al registrar el doctor:", err);
    }
  };

  const handleAgeChange = (text: string) => {
    // Asegúrate de convertir el texto a número
    const age = Number(text);
    if (!isNaN(age)) {
      setDoctor({ ...doctor, age }); // Solo actualiza si el valor es un número
    }
  };

  return (
    <View style={styles.container}>
      <Card className="p-5 rounded-lg max-w-[400px] m-4 h-auto bg-[#F0F8FF] shadow-lg">
        <Heading size="2xl" className="text-center mb-4 text-[#007AFF]">
          Registrar Doctor
        </Heading>
        <VStack className="mb-6 space-y-3">
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={doctor.name}
            onChangeText={(text) => setDoctor({ ...doctor, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={doctor.lastname}
            onChangeText={(text) => setDoctor({ ...doctor, lastname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={doctor.age ? doctor.age.toString() : ""} // Asegúrate de mostrar la edad como string
            keyboardType="numeric"
            onChangeText={handleAgeChange} // Maneja el cambio de la edad
          />
          <TextInput
            style={styles.input}
            placeholder="Especialidad"
            value={doctor.speciality}
            onChangeText={(text) => setDoctor({ ...doctor, speciality: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={doctor.telephone}
            onChangeText={(text) => setDoctor({ ...doctor, telephone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={doctor.direction}
            onChangeText={(text) => setDoctor({ ...doctor, direction: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Consultorio"
            value={doctor.consultory}
            onChangeText={(text) => setDoctor({ ...doctor, consultory: text })}
          />
        </VStack>
        {error && <Text className="text-red-500 text-center mb-2">Error al registrar el doctor</Text>}
        <Button onPress={handleRegisterDoctor} className="px-4 py-2 rounded-xl bg-[#007AFF]" disabled={isLoading}>
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
