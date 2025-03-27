import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "@/components/SearchBar/SearchBar";
import Activity from "@/src/molecules/Activity";
import ModalCustom from "@/components/ModalCustom/ModalCustom";
import { PatientList } from "../Patient";
import { useGetPatientsQuery } from "@/src/services/patient.service";
import { useAddPatientsToDoctorMutation } from "@/src/services/medic.service";
import { useUpdatePatientDoctorMutation } from "@/src/services/patient.service";
import { Patient } from "@/src/models/patient.model";
import Toast from "react-native-toast-message";
import _ from "lodash"; 
import { usePatients } from "@/src/hooks/usePatients";
 

export default function MedicScreen() {
  // Estado de la query
  const [searchTerm, setSearchTerm] = useState('');

  const { data: fetchedData, refetch, isLoading } = useGetPatientsQuery({
    searchTerm
  });
  // Mutations
  const [addPatientsToDoctor] = useAddPatientsToDoctorMutation();
  const [addDoctorToPatient] = useUpdatePatientDoctorMutation();
  const [searchInput, setSearchInput] = useState('');
  // Estados locales
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [doctorId, setDoctorId] = useState<string>("");
  // Control local del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {uniquePatients}= usePatients()

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

  

  const suggestedList = uniquePatients.map((item) => {
    return {
      label: `${item.name} ${item.lastname}`, // Usamos lastName (asegúrate de que el nombre de la propiedad sea correcto)
      value: `${item.name}`,
    };
  });

  // --- Manejo de la búsqueda en el SearchBar ---
  const debouncedSearch = useCallback(
    _.debounce(async (query: string) => {
      await refetch() ;
    }, 500),
    []
  );

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setSearchTerm(query)
    debouncedSearch(query);
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
          style={styles.patientImage}
          alt="image"
        />
        <Text>Información del Paciente</Text>
        <View >
          <Text style={styles.patientName}>{selectedPatient.name} {selectedPatient.lastname}</Text>
          <Text >Edad: {selectedPatient.age}</Text>
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
      <TouchableOpacity onPress={handleAddPatient} style={styles.footerButton}>
        <Text style={styles.closeButtonText}>Añadir Paciente</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.closeButton} onPress={handleCloseModal}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Activity />
      ) : (
        <>
          <Text style={styles.title}>Buscar pacientes</Text>
          {/* Barra de búsqueda */}
             <SearchBar
                placeholder='Filtrar por nombre o apellido'
                handleSecondEvent={handleSearch}
                suggestionsList={suggestedList}
                onSearch={handleSearch}
                value={searchInput}
             />
        
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
