import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from 'react-native';
 
import { Patient } from '@/src/models/patient.model';

export interface PatientListProps {
  data: Patient[];
  onPressPatient?: (patient: Patient) => void;
}


export default function PatientList({ data, onPressPatient }: PatientListProps) {
  const handlePress = (item: Patient) => {
    // Simplemente llamamos a la función que viene por props
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
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>
                {item.name} {item.lastname}
              </Text>
              <Text style={styles.patientDetails}>
                Edad: {item.age}, Teléfono: {item.telephone}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
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
