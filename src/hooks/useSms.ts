// src/hooks/useSendSMS.ts
import * as SMS from 'expo-sms';
import { useEffect, useState } from 'react';

export const useSendSMS = () => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  // Verificamos si SMS está disponible en el dispositivo
  useEffect(() => {
    const checkAvailability = async () => {
      const available = await SMS.isAvailableAsync();
      setIsAvailable(available);
    };

    checkAvailability();
  }, []);

  const sendSMS = async (recipients: string[], message: string) => {
    if (!isAvailable) {
      console.error('SMS no disponible en este dispositivo');
      return { result: 'not-available' };
    }

    try {
      const result = await SMS.sendSMSAsync(recipients, message);
      return result;
    } catch (error) {
      console.error('Error al enviar SMS:', error);
      return { result: 'error' };
    }
  };

  return { sendSMS, isAvailable };
};
