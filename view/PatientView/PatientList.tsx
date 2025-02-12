import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Patient } from '@/src/models/patient.model';
import { useRouter } from "expo-router";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';
import { useAddPatientsToDoctorMutation } from '@/src/services/medic.service'; // Importar la mutación
import { PatientListProps } from './const';
import * as Index from './index';
import { StyleSheet } from 'react-native';
import { useUpdatePatientDoctorMutation } from '@/src/services/patient.service';

const { Ionicons, FlatList } = Index;

export default function PatientList({ data }: PatientListProps) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Obtener el doctorId desde el slice de auth
  const doctorId = useSelector((state: RootState) => state.authslice.medicId); 

  // Configurar el hook para la mutación
  const [addPatientsToDoctor] = useAddPatientsToDoctorMutation();

  const [addDoctorToPatient] = useUpdatePatientDoctorMutation()

  const handlePress = (item: Patient) => {
    setSelectedPatient(item);
    setIsModalVisible(true);
  };

  const handleAddPatient = async () => {
    if (!doctorId) {
      console.error("Error: El ID del doctor no está definido.");
      Alert.alert("Error", "No se pudo obtener la información del doctor.");
      return;
    }

    if (!selectedPatient) {
      console.error("Error: No se ha seleccionado un paciente.");
      Alert.alert("Error", "Por favor, seleccione un paciente.");
      return;
    }

    if (!selectedPatient._id) {
      console.error("Error: El paciente seleccionado no tiene un ID válido.");
      Alert.alert("Error", "El paciente seleccionado no es válido.");
      return;
    }

    try {
      console.log(`Enviando datos: DoctorID=${doctorId}, PacienteID=${selectedPatient._id}`);
      await addPatientsToDoctor({
        doctorId,
        pacientes: [selectedPatient._id],
      }).unwrap();

      await addDoctorToPatient({
        patientId: selectedPatient._id,
        doctor: doctorId,  // Usar doctorId en lugar de doctor
      }).unwrap();
      



      setIsModalVisible(false);
      Alert.alert("Éxito", "Paciente añadido correctamente.");
    } catch (error) {
      console.error("Error al agregar el paciente:", error);
      Alert.alert("Error", "Hubo un problema al añadir el paciente.");
    }
  };

  return (
    <View>
      {/* Lista de Pacientes */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || ''}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.patientItem} 
            onPress={() => handlePress(item)}
          >
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{item.name} {item.lastname} {item._id}</Text>
              <Text style={styles.patientDetails}>Edad: {item.age}, {item.gender}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      />

      {/* Modal con la información del paciente */}
      {selectedPatient && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedPatient.name} {selectedPatient.lastname}</Text>
              <Text>Edad: {selectedPatient.age}</Text>
              <Text>Género: {selectedPatient.gender}</Text>
              <Text>Condición: {selectedPatient.condition}</Text>
              
              <TouchableOpacity 
                style={styles.addButton} 
                onPress={handleAddPatient}
              >
                <Text style={styles.addButtonText}>Añadir Paciente</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

