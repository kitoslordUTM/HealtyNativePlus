import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Patient } from '@/src/models/patient.model';
import { useRouter } from "expo-router";
import { Modal, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';
import { useAddPatientsToDoctorMutation } from '@/src/services/medic.service';
import { PatientListProps } from './const';
import * as Index from './index';
import { useUpdatePatientDoctorMutation } from '@/src/services/patient.service';
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const { Ionicons, FlatList } = Index;

export default function PatientList({ data, refetch }: PatientListProps) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const doctorId = useSelector((state: RootState) => state.authslice.medicId);
  const [addPatientsToDoctor] = useAddPatientsToDoctorMutation();
  const [addDoctorToPatient] = useUpdatePatientDoctorMutation();

  const handlePress = (item: Patient) => {
    setSelectedPatient(item);
    console.log(item)
    setIsModalVisible(true);
  };

  const handleAddPatient = async () => {
    if (!doctorId) {
      console.error("Error: El ID del doctor no está definido.");
      Alert.alert("Error", "No se pudo obtener la información del doctor.");
      return;
    }

    if (!selectedPatient || !selectedPatient._id) {
      console.error("Error: El paciente seleccionado no es válido.");
      Alert.alert("Error", "Por favor, seleccione un paciente válido.");
      return;
    }

    try {
      console.log(`Enviando datos: DoctorID=${doctorId}, PacienteID=${selectedPatient._id}`);
      await addPatientsToDoctor({ doctorId, pacientes: [selectedPatient._id] }).unwrap();
      await addDoctorToPatient({ patientId: selectedPatient._id, doctor: doctorId }).unwrap();
      refetch()
      Alert.alert("Éxito", "Paciente añadido correctamente.");
      setIsModalVisible(false);

    } catch (error) {
      console.error("Error al agregar el paciente:", error);
      Alert.alert("Error", "Hubo un problema al añadir el paciente.");
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || ''}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.patientItem} onPress={() => handlePress(item)}>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{item.name} {item.lastname}</Text>
              <Text style={styles.patientDetails}>Edad: {item.age}, Teléfono: {item.telephone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      />

      {selectedPatient && (
        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <Card className="p-5 rounded-lg max-w-[360px] m-3 bg-white">
              <Image source={{ uri: 'https://gluestack.github.io/public-blog-video-assets/saree.png' }} className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]" alt="image" />
              <Text className="text-sm font-normal mb-2 text-typography-700">Información del Paciente</Text>
              <VStack className="mb-6">
                <Heading size="md" className="mb-4">{selectedPatient.name} {selectedPatient.lastname}</Heading>
                <Text size="sm">Edad: {selectedPatient.age}</Text>
                <Text size="sm">Género: {selectedPatient.gender}</Text>
                <Text size="sm">Condición: {selectedPatient.condition}</Text>
                <Text size="sm">Teléfono: {selectedPatient.telephone}</Text>
                <Text size="sm">Dirección: {selectedPatient.direction}</Text>
               
              </VStack>
              <Box className="flex-col sm:flex-row">
                <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1" onPress={handleAddPatient}>
                  <ButtonText size="sm">Añadir Paciente</ButtonText>
                </Button>
                <Button variant="outline" className="px-4 py-2 border-outline-300 sm:flex-1" onPress={() => setIsModalVisible(false)}>
                  <ButtonText size="sm" className="text-typography-600">Cerrar</ButtonText>
                </Button>
              </Box>
            </Card>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  patientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  patientDetails: {
    fontSize: 14,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
