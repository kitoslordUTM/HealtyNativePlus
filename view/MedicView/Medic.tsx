import { View } from 'react-native';
import {styles} from './style' 
import { Patient } from "@/src/models/patient.model"
import React from "react";
import {    
    Text, 
    TextInput, 
    FlatList, 
    Image, 
    TouchableOpacity 
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Para iconos
import { useGetPatientsQuery } from "@/src/services/patient.service";
import { PatientList } from "../PatientView";
import { useRouter } from "expo-router";

 
export default function Medic() {
  const {data: fetchedData, refetch} = useGetPatientsQuery()
  const router = useRouter();

  return (
     <View style={styles.container}>

      <TouchableOpacity onPress={() => router.push("/home/patients")} className="absolute top-6 left-4 sm:top-10 sm:left-10">
        <Text className="text-black text-3xl   bottom-3">←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Buscar pacientes</Text>
     
     {/* Barra de búsqueda */}
     <View style={styles.searchContainer}>
       <Ionicons name="search-outline" size={20} color="#888" />
       <TextInput style={styles.searchInput} placeholder="Search patient" placeholderTextColor="#888" />
     </View>

     {/* Lista de pacientes */}
     <PatientList
        data={(fetchedData || []).filter(patient => !patient.doctor)}
        refetch={refetch}
      />
     </View>
  )
}
