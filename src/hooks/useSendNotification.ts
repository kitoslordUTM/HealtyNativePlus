import { useCallback } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const useSendNotification = () => {
  const sendNotification = useCallback(async (title: string, body: string) => {
    if (Platform.OS === "web") {
      console.log("Las notificaciones no están disponibles en la web.");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: true },
      trigger: null, // Se envía inmediatamente
    });
  }, []);

  return sendNotification;
};

export default useSendNotification;
