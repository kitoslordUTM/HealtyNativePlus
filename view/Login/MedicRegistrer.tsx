import { useState } from "react";
import { useRouter } from "expo-router";
import { useRegisterDoctorMutation } from "@/src/services/auth.service";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { View, TextInput, ActivityIndicator, KeyboardTypeOptions } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

interface Doctor {
  name: string;
  lastname: string;
  age: number;
  speciality: string;
  telephone: string;
  direction: string;
  consultory: string;
  user: string;
  pacientes: any[];
}

export default function MedicRegistrer() {
  const userId = useSelector((state: RootState) => state.authslice.userId);
  const router = useRouter();
  const [registerDoctor, { isLoading, error }] = useRegisterDoctorMutation();
  const [doctor, setDoctor] = useState<Doctor>({
    name: "",
    lastname: "",
    age: 0,
    speciality: "",
    telephone: "",
    direction: "",
    consultory: "",
    user: userId,
    pacientes: [],
  });

  const handleRegisterDoctor = async () => {
    try {
      const response = await registerDoctor(doctor).unwrap();
      console.log("Doctor registrado:", response);
      router.push("/home");
    } catch (err) {
      console.error("Error al registrar el doctor:", err);
    }
  };

  const fields: { placeholder: string; key: keyof Doctor; keyboardType?: KeyboardTypeOptions }[] = [
    { placeholder: "Nombre", key: "name" },
    { placeholder: "Apellido", key: "lastname" },
    { placeholder: "Edad", key: "age", keyboardType: "numeric" },
    { placeholder: "Especialidad", key: "speciality" },
    { placeholder: "Teléfono", key: "telephone" },
    { placeholder: "Dirección", key: "direction" },
    { placeholder: "Consultorio", key: "consultory" },
  ];

  return (
    <View className="flex items-center justify-center min-h-screen bg-[#0A1F44]">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Heading size="2xl" className="text-center mb-4 text-[#0A1F44]">
          Vamos a registrarnos
        </Heading>
        <VStack className="space-y-3">
          {fields.map(({ placeholder, key, keyboardType }) => (
            <TextInput
              key={key}
              className="w-full p-3 border  border-gray-300 rounded-lg text-[#0A1F44] focus:border-blue-600"
              placeholder={placeholder}
              keyboardType={keyboardType}
              value={typeof doctor[key] === "string" ? (doctor[key] as string) : doctor[key]?.toString() || ""}
              onChangeText={(text) =>
                setDoctor((prev) => ({
                  ...prev,
                  [key]: key === "age" ? Number(text) || 0 : text,
                }))
              }
            />
          ))}
        </VStack>
        {error && <Text className="text-red-500 text-center mt-2">Error al registrar el doctor</Text>}
        <Button onPress={handleRegisterDoctor} className="w-full py-2 mt-4 bg-blue-500 rounded-lg" disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <ButtonText className="text-white text-lg">Registrar</ButtonText>}
        </Button>
      </Card>
    </View>
  );
}
