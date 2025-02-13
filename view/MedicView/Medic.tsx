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


 
export default function Medic() {
  const {data: fetchedData} = useGetPatientsQuery()
  
  return (
     <View style={styles.container}>
           <Text style={styles.title}>Buscar pacientes</Text>
     
     {/* Barra de búsqueda */}
     <View style={styles.searchContainer}>
       <Ionicons name="search-outline" size={20} color="#888" />
       <TextInput style={styles.searchInput} placeholder="Search patient" placeholderTextColor="#888" />
     </View>

     {/* Lista de pacientes */}
     <PatientList
       data={fetchedData || []}
     />
     </View>
  )
}
