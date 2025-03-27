import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('No se otorgaron permisos para recibir notificaciones.');
      return null;
    }

    // 🚀 Distinción entre Web y Móvil
    if (Platform.OS === 'web') {
      try {
        token = await Notifications.getDevicePushTokenAsync();
        console.log('Token Web:', token.data);
      } catch (error) {
        console.error('Error al obtener el token web:', error);
      }
    } else {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Token de notificación móvil obtenido:', token);
      await AsyncStorage.setItem("token", token)
      console.log('Token de notificación móvil obtenidor:', token);
    }
  } else {
    console.log('Las notificaciones push solo funcionan en dispositivos físicos.');
    return null;
  }

  // Configurar canal para Android
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Manejo de notificaciones en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});