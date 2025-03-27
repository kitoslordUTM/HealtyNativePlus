import { View, Text, Image, TouchableOpacity } from "react-native";
import {styles} from './style'
import {ids} from './style'
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetDoctorByUserIdQuery } from "@/src/services/medic.service";
import { useUpdateUserMutation } from "@/src/services/auth.service";
import Activity from "@/src/molecules/Activity";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
 

export default function Home() {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const tokenSent = useRef(false);
  const [addToken] = useUpdateUserMutation();
  const router = useRouter();

  // Obtener userId y token, cargar datos del médico y actualizar token de notificación
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Recuperar userId y token
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedUserId && storedToken) {
          setUserId(storedUserId);
          setToken(storedToken);
        }
      } catch (err) {
        console.error("Error al recuperar userId y token", err);
      }
    };

    initializeData();
  }, []);

  // Obtener datos del médico
  const { data, isLoading } = useGetDoctorByUserIdQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    const processDoctorData = async () => {
      if (data?._id) {
        await AsyncStorage.setItem("medicId", data._id);
        console.log("Medic ID guardado:", data._id);
      }

      // Enviar token de notificación solo si no se ha enviado antes
      if (userId && token && !tokenSent.current) {
        addToken({ userId, updates: { notificationToken: token } });
        console.log("Token actualizado en la API");
        tokenSent.current = true;
      }
    };

    if (data) {
      processDoctorData();
    }
  }, [data, userId, token, addToken]);

  const patientNumber = data?.pacientes?.length || 0;

  return (
    <View style={styles.container}  dataSet={{ id: ids.container }}>
      {isLoading ? (
        <Activity />
      ) : (
        <>
          <Text style={styles.TittleCenter}>Hola {data?.name}</Text>
          <Image source={require("@/assets/back.png")} style={styles.image} />
          
          {/* Sección de estadísticas */}
          <View style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: 8, marginTop: 20}}> 
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Pacientes</Text>
                <Text style={styles.statValue}>{patientNumber}</Text>
              </View>
            </View>

            {/* Opciones de navegación */}
            <View style={styles.linksContainer}>
              <TouchableOpacity style={styles.link} onPress={()=> router.push('./addpatients')}>
                <Text style={styles.linkText}>Añadir pacientes</Text>
                <View style={{alignSelf:'flex-end', marginLeft:20}}>
                  <Ionicons name="add-circle" size={44} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
