import { useState } from "react";
import { useRouter } from "expo-router";
import { useSignUpMutation } from "@/src/services/auth.service";
import { ActivityIndicator, View, TextInput, TouchableOpacity } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import Toast from "react-native-toast-message";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyleSheet from 'react-native-media-query';
import { ImageBackground } from "react-native";
import MedicRegistrer from "./MedicRegistrer";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Auth() {
  const router = useRouter();
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [ userId, setUserId] = useState<string>('') 
 

  const handleRegister = async () => {
    try {
      const response = await signUp(credentials).unwrap();
      if (response.user && response.user.id) {
        await AsyncStorage.setItem("userId", response.user.id);
        setUserId(response.user.id)
        console.log(response.user.id)

        Toast.show({
          type: 'success',
          text1: 'Exito',
          text2: 'Exito al registrar tu correo electrónico 👋'
        });

       
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error al registrar tu correo electrónico 👋'
      });
    }
  };

  const renderSignUp = () => 
  (
    <>
      <View  style={styles.container} dataSet={{media: ids.container}}>     
        <Heading style={{ alignSelf:'center', color: '#0A2240', padding: 15, fontSize: 25}}>
          Registrate
        </Heading>
    
        <TextInput
          style={styles.input}
          dataSet={{media: ids.input}}
        
          placeholder="Ejemplo@gmail.com"
          placeholderTextColor="#0A2240"
          value={credentials.email}
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
        <View  style={styles.password} dataSet={{media: ids.password}}>
          <TextInput
            placeholder="Contraseña"
            style={{padding: 15, width:'85%', borderTopStartRadius: 20, borderBottomStartRadius: 20,  }}
            secureTextEntry={!showPassword}
            value={credentials.password}
            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
      
          >
            <Text style={{ marginTop:12   }} >{showPassword ? "Ocultar" : "Ver"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleRegister}   disabled={isLoading} style={styles.button}  >
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={{color:"#fff", alignSelf:'center'}} >CREAR CUENTA</Text>}
        </TouchableOpacity>
      </View>
    </>
  );



  return (

    <ImageBackground 
    source={require('@/assets/imagenDoc.png')}
    style={styles.imageBackground}>

     <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        paddingTop: 35,
        paddingLeft:19
        }} >
        <Ionicons name="chevron-back-outline" size={25} color="#fff" />
    </View>

    <View style={styles.phaterContainer} dataSet={{media: ids.phaterContainer}}>
      {userId ? 
      <MedicRegistrer
        userId={userId}/> : 
        renderSignUp()
      }
    </View>
    </ImageBackground>  
  );
}



const {styles, ids} = StyleSheet.create({

    phaterContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        width: '100%',
        '@media(max-width:400px   )':{
          width: '100%',
        },

        '@media (max-width: 2000px)':{
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }
    },

    container:{
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        '@media (max-width: 2000px)':{
          flexDirection: 'column',
          backgroundColor: 'white',
          gap: 20,
          width: '50%',
          position: 'absolute', 
          bottom: 0,
          height: '70%',
           
        },
        '@media (max-width: 500px)': {
          width: '100%', 
          height: '65%',
        },
    },

    imageBackground : {
      width: '100%',
      height: '100%',
      '@media(max-width:400px )':{
        width: '100%',
      },
    
    },

    input :{
      padding: 15, 
      borderRadius: 24,  
      width:'80%', 
      borderWidth: 2, 
      borderColor: '#0A2240', 
      alignSelf: 'center',
      '@media (max-width: 2000px)':{
        padding: 15, 
        borderRadius: 20, 
        width:'80%', 
        borderWidth: 2, 
        borderColor: '#0A2240', 
        alignSelf: 'center'
      }
    },

    password:{
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 24, 
      width:'80%', 
      borderWidth: 2, 
      borderColor: '#0A2240', 
      alignSelf: 'center',
      '@media (max-width: 2000px)':{
        
        borderRadius: 24, 
        width:'80%', 
        borderWidth: 2, 
        borderColor: '#0A2240', 
        alignSelf: 'center',
        flexDirection: 'row',
        display: 'flex'
    }
  },

  button:{
    padding: 15, 
    borderRadius: 20, 
    width:'80%', 
    borderWidth: 2, 
    borderColor: '#0A2240', 
    alignSelf: 'center',
    marginBottom: 13,
    backgroundColor: '#0A2240',
    color:"#fff"
  }

});