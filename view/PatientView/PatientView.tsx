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
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ButtonText } from "@/components/ui/button";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store/store';
import { setOpen } from './PatientSlice';

export default function PatientView() {
  const SelectedModal = useSelector((state: RootState) => state.modalSlice.open);
  const dispatch = useDispatch();

  const [doctorId, setDoctorId] = useState<string>('');
  
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

  const router = useRouter();
  const { data, refetch } = useGetPatientsByDoctorIdQuery(doctorId, {
    skip: !doctorId, // Evita la consulta hasta que doctorId esté definido
  });

  useEffect(() => {
    if (doctorId) {
      refetch();
      console.log("Refetching patients for doctor ID:", doctorId);
    }
  }, [doctorId]);


  const VitalButton = (
    <>
      <Button
        onPress={() => {
          
          router.push("/Vital"); // Navega a la pantalla de signos vitales
          dispatch(setOpen(false));
          
        }}
      >
        <ButtonText size="sm">Ver signos vitales</ButtonText>
      </Button>
    </>
  );
  

  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Mis pacientes</Text>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput style={styles.searchInput} placeholder="Search patient" placeholderTextColor="#888" />
      </View>

      {/* Lista de pacientes */}
     { (data ?? []).length > 0 ? (
       <PatientList
       data={data || []}
       refetch={refetch}
       button ={ VitalButton }
     />
     ) :
     (
        <Text  >No tienes pacientes asignados</Text>
     )
     }

      {/* Botón de agregar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          router.push("/medic");
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}


