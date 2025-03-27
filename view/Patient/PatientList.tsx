import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from 'react-native';
import { Patient } from '@/src/models/patient.model';

export interface PatientListProps {
  data: Patient[];
  onPressPatient?: (patient: Patient) => void;
}

// Array con imágenes aleatorias
const patientImages = [
  require("@/assets/patient1.jpg"),
  require("@/assets/patient2.jpg"),
  require("@/assets/patient3.jpg"),
  require("@/assets/patient4.jpg"),
  require("@/assets/patient5.jpg"),
];

export default function PatientList({ data, onPressPatient }: PatientListProps) {
  
  // Función para obtener una imagen aleatoria
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * patientImages.length);
    return patientImages[randomIndex];
  };

  const handlePress = (item: Patient) => {
    onPressPatient?.(item);
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.patientItem}
            onPress={() => handlePress(item)}
          >
            <Image
              source={getRandomImage()} // Imagen aleatoria para cada paciente
              style={styles.patientImage}
            />
            
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>
                {item.name} {item.lastname}
              </Text>
              <Text style={styles.patientDetails}>
                Edad: {item.age}, Teléfono: {item.telephone}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={30} color="#11275d" />
          </TouchableOpacity>
        )}
      />
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
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
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
});
