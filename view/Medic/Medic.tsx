import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Activity from "@/src/molecules/Activity";
import ModalCustom from "@/components/ModalCustom";
import { PatientList } from "../Patient";
import { useGetPatientsQuery } from "@/src/services/patient.service";
import { useAddPatientsToDoctorMutation } from "@/src/services/medic.service";
import { useUpdatePatientDoctorMutation } from "@/src/services/patient.service";
import { Patient } from "@/src/models/patient.model";
import Toast from "react-native-toast-message";

export default function MedicScreen() {
  // Estado de la query
  const { data: fetchedData, refetch, isLoading } = useGetPatientsQuery();
  // Mutations
  const [addPatientsToDoctor] = useAddPatientsToDoctorMutation();
  const [addDoctorToPatient] = useUpdatePatientDoctorMutation();

  // Estados locales
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [doctorId, setDoctorId] = useState<string>("");
  // Control local del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  // Obtener doctorId de AsyncStorage
  useEffect(() => {
    const fetchDoctorId = async () => {
      try {
        const storedDoctorId = await AsyncStorage.getItem("medicId");
        if (storedDoctorId) {
          setDoctorId(storedDoctorId);
        }
      } catch (error) {
        console.error("Error al recuperar el ID del doctor:", error);
      }
    };
    fetchDoctorId();
  }, []);

  // Refetch cuando la vista se enfoca
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // Ordenar pacientes de forma descendente
  const sortedPatients = (fetchedData || [])
    .filter((patient) => !patient.doctor) // Filtrar pacientes sin doctor
    .sort((a, b) => {
      if (a._id && b._id) {
        return b._id.localeCompare(a._id); // Orden descendente por _id
      }
      return 0;
    });

  // Al tocar un paciente
  const handlePressPatient = async (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true); // abrir modal local
    try {
      await AsyncStorage.setItem("selectedPatientId", patient._id || "");
    } catch (error) {
      console.error("Error al guardar el ID del paciente en AsyncStorage:", error);
    }
  };

  // Añadir paciente al doctor
  const handleAddPatient = async () => {
    if (!doctorId) {
      setIsModalOpen(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo obtener la información del doctor. 👋",
      });
      return;
    }
    if (!selectedPatient || !selectedPatient._id) {
      setIsModalOpen(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Por favor, seleccione un paciente válido. 👋",
      });
      return;
    }
    try {
      await addPatientsToDoctor({ doctorId, pacientes: [selectedPatient._id] }).unwrap();
      await addDoctorToPatient({ patientId: selectedPatient._id, doctor: doctorId }).unwrap();
      refetch();
      setIsModalOpen(false);
      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: "Paciente añadido correctamente. 👋",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Hubo un problema al añadir el paciente. 👋",
      });
    }
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  // Contenido del modal
  const ModalBody = () => {
    if (!selectedPatient) {
      return <Text>No hay información del paciente disponible.</Text>;
    }
    return (
      <View style={styles.modalOverlay}>
        <Image
          source={{ uri: "https://gluestack.github.io/public-blog-video-assets/saree.png" }}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt="image"
        />
        <Text>Información del Paciente</Text>
        <View>
          <Text>{selectedPatient.name} {selectedPatient.lastname}</Text>
          <Text>Edad: {selectedPatient.age}</Text>
          <Text>Género: {selectedPatient.gender}</Text>
          <Text>Condición: {selectedPatient.condition}</Text>
          <Text>Teléfono: {selectedPatient.telephone}</Text>
          <Text>Dirección: {selectedPatient.direction}</Text>
        </View>
      </View>
    );
  };

  // Footer del modal
  const ModalFooter = () => (
    <View style={{ flexDirection: "column", justifyContent: "space-evenly" }}>
      <TouchableOpacity onPress={handleAddPatient}>
        <Text>Añadir Paciente</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCloseModal}>
        <Text>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Activity />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => router.push("/home/patients")}
            style={{ position: "absolute", top: 24, left: 16 }}
          >
            <Text style={{ fontSize: 24 }}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Buscar pacientes</Text>

          {/* Barra de búsqueda */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search patient"
              placeholderTextColor="#888"
            />
          </View>

          {/* Lista de pacientes */}
          <ScrollView>
            <PatientList
              data={sortedPatients} // Usamos la lista ordenada
              onPressPatient={handlePressPatient}
            />
          </ScrollView>

          {/* Modal local */}
          <ModalCustom
            visible={isModalOpen}
            onClose={handleCloseModal}
            title="Añadir Paciente"
            body={<ModalBody />}
            footer={<ModalFooter />}
          />
        </>
      )}
    </View>
  );
}
