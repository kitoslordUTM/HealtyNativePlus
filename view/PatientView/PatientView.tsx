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


// Datos de ejemplo
// const patients = [
//   { id: "1", name: "Samantha Powell", age: 21, gender: "Female", image: "https://randomuser.me/api/portraits/women/1.jpg" },
//   { id: "2", name: "Nathan Harris", age: 34, gender: "Male", image: "https://randomuser.me/api/portraits/men/2.jpg" },
//   { id: "3", name: "Ava Martínez", age: 45, gender: "Female", image: "https://randomuser.me/api/portraits/women/3.jpg" },
//   { id: "4", name: "William Johnson", age: 58, gender: "Male", image: "https://randomuser.me/api/portraits/men/4.jpg" },
// ];



export default function PatientView() {
  const router = useRouter();
  const {data}= useGetPatientsQuery()
  
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
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

 