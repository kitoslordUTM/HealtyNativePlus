import * as Index from './index'
import {styles} from './style'
const {
    React,
    useState,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ImagePicker,
 
} = Index



 
 export default function SettingsView() {
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
   )
 }
 
