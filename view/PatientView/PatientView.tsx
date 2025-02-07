import * as Index from './index';
import { styles } from './style';
const { 
  React, 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Ionicons, 
  useGetPatientsQuery, 
  useRouter, 
  PatientList, 
} = Index;


export default function PatientView() {
  const router = useRouter();
  const {data}= useGetPatientsQuery()
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Mis Pacientes</Text>

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
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

 