import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { useGetDoctorByUserIdQuery } from '@/src/services/medic.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store/store';
import { setMedicId } from '../Login/AuthSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeView() {
 
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        console.log("User ID recuperado de AsyncStorage:", storedUserId); // Verifica que se recupera
        if (storedUserId) {
            setUserId(storedUserId);
        }
      } catch (err) {
        console.error("Error al recuperar userId", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  const { data } = useGetDoctorByUserIdQuery(userId);

  useEffect(() => {
    const storeMedicId = async () => {
      if (data?._id) {
        const medicId = data._id;
        await AsyncStorage.setItem("medicId", medicId || '');
        console.log("Medic ID set:", medicId);
      }
    };
    storeMedicId();
  }, [data]); // Se ejecuta solo cuando 'data' cambia

  const patientNumber = data?.pacientes?.length || 0; 


  return (
    <View style={styles.container}>
      <Text style={styles.TittleCenter}>Hola {data?.name}</Text>
      <Image source={require('@/assets/image413.png')} style={styles.image} />
      {/* Sección de estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Pacientes</Text>
          <Text style={styles.statValue}>{patientNumber}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.smallBox}>
            <Text style={styles.statLabel}>Alertas</Text>
            <Text style={styles.statValue}>{data?.pacientes?.length}</Text>
          </View>
          <View style={styles.smallBox}>
            <Text style={styles.statLabel}>Notificaciones</Text>
            <Text style={styles.statValue}>20</Text>
          </View>
        </View>
      </View>
      {/* Opciones de navegación */}
      <View style={styles.linksContainer}>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Ver todas las alertas</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Ver todas las notificaciones</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Acciones Médicas</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
