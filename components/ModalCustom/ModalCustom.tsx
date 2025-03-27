import React, { ReactNode } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import StyleSheet from 'react-native-media-query';

interface ModalProps {
  visible: boolean;               // <-- Lo recibimos como prop
  onClose: () => void;            // <-- Callback para cerrar
  title?: string | ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}

export default function ModalCustom({ visible, onClose, title, body, footer }: ModalProps) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.eContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView style={styles.body}>{body}</ScrollView>
          <View style={styles.footer}>{footer}</View>
        </View>
      </View>
    </Modal>
  );
}

const { styles } = StyleSheet.create({
  eContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: '70%', // Ajustar según el diseño
    maxWidth: 600, // Para evitar que sea demasiado ancho
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  body: {
    marginBottom: 10,
  },
  footer: {
    alignSelf: 'center',
    flexDirection: 'column',
  },
});
