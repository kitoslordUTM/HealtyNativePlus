import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Settings() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Configuración</Text>
        </View>

        <View style={styles.profile}>
          <Image
            source={require('../../assets/perfil.jpg')}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>Jesus</Text>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icono-flecha.png')} style={styles.icon} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Apellido</Text>
          <Text style={styles.value}>Rodriguez</Text>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icono-flecha.png')} style={styles.icon} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Número de teléfono</Text>
          <Text style={styles.value}>9992613980</Text>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icono-flecha.png')} style={styles.icon} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Cédula Profesional</Text>
          <Text style={styles.value}>DJD093356SYESO9</Text>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icono-flecha.png')} style={styles.icon} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Correo electrónico</Text>
          <Text style={styles.value}>jesus3839@gmail.com</Text> <View style={styles.iconContainer}>
            <Image source={require('../../assets/icono-flecha.png')} style={styles.icon} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Cambiar mi contraseña</Text>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icono-flecha.png')} style={styles.icon} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Cerrar sesión</Text> 
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icono-cerrar.png')} style={styles.iconcerrar} />
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar Cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20},
  profile: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: 'white',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontWeight: 'bold',
    width: 200,
    fontSize: 14,
    color: '#333',
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: 'transparent', 
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333', 
    marginTop:60,
  },
  deleteButtonText: {
    color: '#F0506E', 
    fontSize: 14,
    fontWeight:'bold'
  },
  iconcerrar: {
    width: 40,
    height: 40,
    flexDirection:'row',
  }
});