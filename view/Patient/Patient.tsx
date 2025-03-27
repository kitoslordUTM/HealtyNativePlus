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
import SearchBar from "@/components/SearchBar/SearchBar";
import { useGetPatientsByDoctorIdQuery } from "@/src/services/medic.service";
import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ButtonText } from "@/components/ui/button";
import Activity from "@/src/molecules/Activity";
import { useFocusEffect } from "@react-navigation/native";
import ModalCustom from "@/components/ModalCustom/ModalCustom";
import { Patient as PatientModel } from "@/src/models/patient.model";
import { Image } from "react-native";
import { usePatients } from "@/src/hooks/usePatients";
import _ from "lodash";
import { useSendSMS } from "@/src/hooks/useSms";
import { ScrollView } from "react-native";
import { S } from "@expo/html-elements";

const patientImages = [
  require("@/assets/patient1.jpg"),
  require("@/assets/patient2.jpg"),
  require("@/assets/patient3.jpg"),
  require("@/assets/patient4.jpg"),
  require("@/assets/patient5.jpg"),
];

export default function PatientScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para guardar el ID del doctor
  const [doctorId, setDoctorId] = useState<string>("");
  // Estado para el paciente seleccionado
  const [selectedPatient, setSelectedPatient] = useState<PatientModel | null>(
    null
  );
  // Estado local para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // Obtener pacientes por ID de doctor
  const { data, refetch, isLoading } = useGetPatientsByDoctorIdQuery(
    { doctorId, searchTerm }, // Pasamos doctorId y un posible searchTerm
    { skip: !doctorId }
  );

  const { data: list } = usePatients(doctorId);
  const { sendSMS, isAvailable } = useSendSMS()

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * patientImages.length);
    return patientImages[randomIndex];
  };

  const handleSendSMS = async (phoneNumber: string) => {
    if (!isAvailable) {
      console.error('SMS no disponible en este dispositivo');
      return;
    }

    const result = await sendSMS([phoneNumber], 'Mensaje de emergencia');
    if (result.result === 'sent') {
      console.log('SMS enviado');
    } else {
      console.error('Error al enviar SMS');
    }
  };


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
      console.error(
        "Error al guardar el ID del paciente en AsyncStorage:",
        error
      );
    }
  };

  const suggestedList = (list ?? []).map((item) => {
    return {
      label: `${item.name} ${item.lastname}`, // Usamos lastName (asegúrate de que el nombre de la propiedad sea correcto)
      value: `${item.name}`,
    };
  });

  const debouncedSearch = useCallback(
    _.debounce(async (query: string) => {
      await refetch();
    }, 500),
    []
  );

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setSearchTerm(query);
    debouncedSearch(query);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  // Contenido del modal
  const ModalBody = () => {
    if (!selectedPatient) return <Text>No hay información del paciente disponible.</Text>;

    return (
      <View style={styles.modalContent}>
        <Image
          source={getRandomImage()}
          style={styles.patientImage}
        />
        <ScrollView style={{height: 300}}>
        <Text style={styles.patientName}>{selectedPatient.name} {selectedPatient.lastname}</Text>
        <View style={styles.patientDetails}>
          <Text>Edad: {selectedPatient.age}</Text>
          <Text>Género: {selectedPatient.gender}</Text>
          <Text>Condición: {selectedPatient.condition}</Text>
          <Text>Teléfono: {selectedPatient.telephone}</Text>
          <Text>Dirección: {selectedPatient.direction}</Text>
        </View>
        <Text style={styles.subHeading}>Contactos de emergencia</Text>
        <Text>Emergencia 1: {selectedPatient.rescueNumberOne}</Text>
        <Text>Emergencia 2: {selectedPatient.rescueNumberTwo}</Text>
        <View style={styles.contactButtons}>
          <Button
            onPress={() => handleSendSMS(selectedPatient.rescueNumberOne?.toString() || '')}
            style={styles.smsButton}
            disabled={!isAvailable}  // Deshabilita el botón si SMS no está disponible
          >
            <Text style={styles.smsButtonText}>Emergencia 1</Text>
          </Button>
          <Button
            onPress={() => handleSendSMS(selectedPatient.rescueNumberTwo?.toString() || '')}
            style={styles.smsButton}
            disabled={!isAvailable}  // Deshabilita el botón si SMS no está disponible
          >
            <Text style={styles.smsButtonText}>Emergencia 2</Text>
          </Button>
          {!isAvailable && <Text style={styles.smsUnavailableText}>SMS no disponible en este dispositivo</Text>}
          
        </View>
        </ScrollView>
      </View>
    );
  };


  // Footer del modal
  const VitalButton = () => {
    return (
      <>
       <View style={{ flexDirection: "column",   width: "100%" }}>
       <Button
          onPress={() => {
            router.push("./vital"); // Navega a la pantalla de signos vitales
            setIsModalOpen(false);
          }}
          style={ styles.footerButton}
        >
          <ButtonText style={styles.footerButtonText}>Ver signos vitales</ButtonText>
        </Button>

        <TouchableOpacity style={styles.closeButton}   onPress={handleCloseModal}>
          <Text style={ styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
       </View>
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
          <SearchBar
            placeholder="Filtrar por nombre o apellido"
            handleSecondEvent={handleSearch}
            suggestionsList={suggestedList}
            onSearch={handleSearch}
            value={searchInput}
          />

          {/* Lista de pacientes */}
          {(data ?? []).length > 0 ? (
            <PatientList
              data={data || []}
              onPressPatient={handlePressPatient}
            />
          ) : (
            <Text>No tienes pacientes asignados</Text>
          )}

          {/* Modal local */}
          <ModalCustom
            visible={isModalOpen}
            onClose={handleCloseModal}
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
