import { useState } from "react";
import { useRouter } from "expo-router";
import { useRegisterDoctorMutation } from "@/src/services/auth.service";
import { View, TextInput, ActivityIndicator, KeyboardTypeOptions } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { DoctorRegistrer } from "@/src/models/medic.model";
import { registrerFields as fields}  from "./utils";
import { MedicRegistrerProps } from "./utils";
import Toast from "react-native-toast-message";
import StyleSheet from 'react-native-media-query';
import { ScrollView } from "react-native";

export default function MedicRegistrer({userId}: MedicRegistrerProps) {

  const [doctor, setDoctor] = useState<DoctorRegistrer>( 
    {
    name: "",
    lastname: "",
    age: 0,
    speciality: "",
    telephone: "",
    direction: "",
    consultory: "",
    user: userId,
    pacientes: []}
  );
  const [registerDoctor, { isLoading }] = useRegisterDoctorMutation();
  const router = useRouter();
  
 const handleRegisterDoctor = async () => {

  console.log(userId)

  if (!doctor.user) {
    console.error("Error: El userId no está definido en doctor");
    Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'id doc 👋'
          });
    return;
  }



  try {
    const response = await registerDoctor( doctor).unwrap();
    console.log("Doctor registrado:", response);
    Toast.show({
              type: 'success',
              text1: 'Exito',
              text2: 'Exito al registrar tus datos 👋'
            });
    router.push("/home");
  } catch (err) {
    Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Error al registrar tus datos 👋'
          });
    console.error("Error al registrar el doctor:", err);
  }
};


  return (
      <ScrollView style={styles.container} dataSet={{media: ids.container}}>
        <Heading style={{alignSelf: 'center', paddingTop: 10}}>
          Ingresa tus datos
        </Heading>
        <VStack style={{gap:'0.5rem'}}>
          {fields.map(({ placeholder, key, keyboardType }) => (
            <TextInput
              style={styles.input}
              dataSet={{media: ids.input}}
              key={key}
              placeholder={placeholder}
              keyboardType={keyboardType}
              value={typeof doctor[key] === "string" ? (doctor[key] as string) : doctor[key]?.toString() || ""}
              onChangeText={(text) =>
                setDoctor((prev) => ({
                  ...prev,
                  [key]: key === "age" ? Number(text) || 0 : text,
                }))
              }
            />
          ))}
        </VStack>
        <TouchableOpacity onPress={handleRegisterDoctor}  disabled={isLoading}
          style={styles.button}  
        >
          {isLoading ? 
            <ActivityIndicator color="#fff" /> 
          : <Text style={{ color:'#fff', alignSelf:'center'}}>Registrar</Text>}
        </TouchableOpacity>
      </ScrollView>
  );
}


const {styles, ids} = StyleSheet.create({

  container:{
    flexDirection: 'row',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
     
    '@media (max-width: 2000px)':{
      flexDirection: 'column',
      backgroundColor: 'white',
      width: '50%',
      position: 'absolute', // 📌 Lo posiciona de forma absoluta en la pantalla
      bottom: 0,
      height: '100%',
      gap:'0.5rem'
       
    },
    '@media (max-width: 480px)': {
      width: '100%', // 📌 Se adapta mejor a celulares pequeños
      height: '65%',
    },
  },

  input :{
    padding: 15, 
    borderRadius: 24, 
    width:'80%', 
    borderWidth: 2, 
    borderColor: '#0A2240', 
    alignSelf: 'center',
    marginBottom: 5,
    '@media (max-width: 2000px)':{
      padding: 15, 
      borderRadius: 24, 
      width:'80%', 
      borderWidth: 2, 
      borderColor: '#0A2240', 
      alignSelf: 'center'
    }
  },

  button:{
    padding: 15, 
    borderRadius: 24, 
    width:'80%', 
    borderWidth: 2, 
    borderColor: '#0A2240', 
    alignSelf: 'center',
    marginBottom: 13,
    backgroundColor: '#0A2240'
  }
 
});