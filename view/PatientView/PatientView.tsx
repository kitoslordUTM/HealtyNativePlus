import * as Index from './index';
import { styles } from './style';
import { useRouter } from "expo-router";
const { 
  React, 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Ionicons, 
 
  
  PatientList, 
} = Index;
 import { useGetPatientsByDoctorIdQuery } from '@/src/services/medic.service';
 import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';


export default function PatientView() {

  const doctorId = useSelector((state: RootState) => state.authslice.medicId); 

  const router = useRouter();
  const {data} = useGetPatientsByDoctorIdQuery( doctorId)
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacientes</Text>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput style={styles.searchInput} placeholder="Search patient" placeholderTextColor="#888" />
      </View>

      {/* Lista de pacientes */}
      <PatientList
        data={data || []}
      />

      {/* Botón de agregar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          console.log("Navegando a /medic"); // Depuración
          router.push("/medic");
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

 