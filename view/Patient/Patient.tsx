import * as Index from "./index";
import { styles } from "./style";
import { useRouter } from "expo-router";
const {
  React,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Ionicons,
  PatientList,
} = Index;

import { useGetPatientsByDoctorIdQuery } from "@/src/services/medic.service";
import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ButtonText } from "@/components/ui/button";
import Activity from "@/src/molecules/Activity";
import { useFocusEffect } from "@react-navigation/native";
import ModalCustom from "@/components/ModalCustom";
import { Patient as PatientModel } from "@/src/models/patient.model";
import { Image } from "react-native";

export default function PatientScreen() {
  const router = useRouter();

  // Estado para guardar el ID del doctor
  const [doctorId, setDoctorId] = useState<string>("");
  // Estado para el paciente seleccionado
  const [selectedPatient, setSelectedPatient] = useState<PatientModel | null>(null);
  // Estado local para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtener pacientes por ID de doctor
  const { data, refetch, isLoading } = useGetPatientsByDoctorIdQuery(doctorId, {
    skip: !doctorId,
  });

  // Al montar, obtenemos el doctorId de AsyncStorage
  useEffect(() => {
    const fetchDoctorId = async () => {
      try {
        const storedDoctorId = await AsyncStorage.getItem("medicId");
        if (storedDoctorId) {
          setDoctorId(storedDoctorId);
          console.log("Doctor ID set:", storedDoctorId);
        }
      } catch (error) {
        console.error("Error al recuperar el ID del doctor:", error);
      }
    };
    fetchDoctorId();
  }, []);

  // Cada vez que la vista se enfoca, hacemos refetch
  useFocusEffect(
    useCallback(() => {
      if (doctorId) {
        refetch();
        console.log("Refetching patients for doctor ID:", doctorId);
      }
    }, [doctorId, refetch])
  );

  // Manejar click en un paciente
  const handlePressPatient = async (patient: PatientModel) => {
    setSelectedPatient(patient);
    setIsModalOpen(true); // Abre el modal localmente

    // Guardar en AsyncStorage (opcional)
    try {
      await AsyncStorage.setItem("selectedPatientId", patient._id || "");
      console.log("Stored patient ID:", patient._id);
    } catch (error) {
      console.error("Error al guardar el ID del paciente en AsyncStorage:", error);
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
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Información del Paciente</Text>
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
  const VitalButton = () => {
    return (
      <>
        <Button
          onPress={() => {
            router.push("./vital"); // Navega a la pantalla de signos vitales
            setIsModalOpen(false);
          }}
        >
          <ButtonText size="sm">Ver signos vitales</ButtonText>
        </Button>

        <TouchableOpacity onPress={handleCloseModal}>
          <Text style={{ marginTop: 10 }}>Cerrar</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Activity />
      ) : (
        <>
          <Text style={styles.title}>Mis pacientes</Text>
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
          {(data ?? []).length > 0 ? (
            <PatientList data={data || []} onPressPatient={handlePressPatient} />
          ) : (
            <Text>No tienes pacientes asignados</Text>
          )}

          {/* Modal local */}
          <ModalCustom
            visible={isModalOpen}
            onClose={handleCloseModal}
            title="Ver signos vitales"
            body={<ModalBody />}
            footer={<VitalButton />}
          />

          {/* Botón de agregar */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              router.push("./addpatients");
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
