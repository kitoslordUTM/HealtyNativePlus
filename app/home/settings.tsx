import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Settings() {
  const [profileImage, setProfileImage] = useState(require('../../assets/perfil.jpg')); 
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la galería.');
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsEditing: true, 
        aspect: [4, 4], 
        quality: 1, 
      });

      if (!result.canceled) {
        setProfileImage({ uri: result.assets[0].uri }); 
      }
    } catch (error) {
      console.log("Error al seleccionar imagen:", error);
    }
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/iconoflechaN.png')}
             style={styles.icon}>
             </Image>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configuración</Text>
         </View>
        <View style={styles.profile}>
          <Image source={profileImage} style={styles.profileImage} /> 
          <TouchableOpacity style={styles.editIconContainer} onPress={pickImage}> 
            <Image
              source={require('../../assets/iconoeditar.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>Jesus</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/iconoflecha.png')} 
            style={styles.icon}>
            </Image>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Apellido</Text>
          <Text style={styles.value}>Rodriguez</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/iconoflecha.png')} style={styles.icon}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Número de teléfono</Text>
          <Text style={styles.value}>9992613980</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/iconoflecha.png')} style={styles.icon}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Cédula Profesional</Text>
          <Text style={styles.value}>DJD093356SYESO9</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/iconoflecha.png')} style={styles.icon}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Correo electrónico</Text>
          <Text style={styles.value}>jesus3839@gmail.com</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/iconoflecha.png')} style={styles.icon}></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Cambiar mi contraseña</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/iconoflecha.png')} style={styles.icon}></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Cerrar sesión</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={require('../../assets/iconocerrar.png')} style={styles.iconcerrar}></Image>
          </TouchableOpacity>
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
    paddingTop: 50,
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
    marginTop: 20,
  },
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
    //borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 8, 
  },
  iconcerrar: {
    width: 40,
    height: 40,
  },
  label: {
    fontWeight: 'bold',
    width: 200,
    fontSize: 16,
    color: '#333',
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: 'transparent', // Fondo transparente
    padding: 18,
    borderRadius: 20,
    marginTop: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8F8F8F',
  },
  deleteButtonText: {
    color: '#F0506E', 
    fontSize: 14,
    fontWeight:'bold'
  },
  editIconContainer: { 
    position: 'absolute', 
    bottom: 8, 
    right: 108,  
    backgroundColor: '#8F8F8F', 
    borderRadius: 20,
    padding: 8,     
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  editIcon: { 
    width: 20,
    height: 20,
    tintColor: 'white' 
  },
});