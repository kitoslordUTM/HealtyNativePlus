import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';


export default function HomeView() {
  return (
    <View style={styles.container}>
          {/* Imagen principal */}

          <Text style={ styles.TittleCenter } >  Home </Text>  

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
  )
}

