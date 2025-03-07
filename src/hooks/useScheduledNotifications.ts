import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const useScheduledNotifications = (): void => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        console.log("Token recuperado de AsyncStorage:", storedToken);
      } catch (error) {
        console.error("Error al recuperar el token:", error);
      }
    };

    checkToken();

    // 🔹 Configurar notificaciones cada 45 segundos
    const interval = setInterval(async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🔔 Recordatorio ejemplo",
          body: "Notificación para el paciente con hipertensión, tomar su pastilla SIDELNAFIL.",
          sound: true,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, // Usa el enum correcto
            seconds: 60,
            repeats: false,
          },
  
      });
    }, 60000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);
};

export default useScheduledNotifications;
