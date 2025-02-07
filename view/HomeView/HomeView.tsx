import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { useGetDoctorByUserIdQuery } from '@/src/services/medic.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store/store';
import { setMedicId } from '../Login/AuthSlice';
import { useEffect } from 'react';

export default function HomeView() {
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.authslice.userId);
  const { data } = useGetDoctorByUserIdQuery(userId);

  useEffect(() => {
    if (data?._id) {
      dispatch(setMedicId(data._id));
      console.log("Doctor ID set:", data._id);
    }
  }, [data, dispatch]); // Se ejecuta solo cuando 'data' cambia

  return (
    <View style={styles.container}>
      <Text style={styles.TittleCenter}>Hola {data?.name}</Text>

      <Image source={require('@/assets/image413.png')} style={styles.image} />

      {/* Sección de estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Pacientes</Text>
          <Text style={styles.statValue}>1,000</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.smallBox}>
            <Text style={styles.statLabel}>Alertas</Text>
            <Text style={styles.statValue}>10</Text>
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
