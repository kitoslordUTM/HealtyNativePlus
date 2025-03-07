import { DoctorRegistrer } from "@/src/models/medic.model";
import {KeyboardTypeOptions} from 'react-native'

export type LoginProps ={

    handleLogin: ()=> void

}

export const registrerFields: { placeholder: string; key: keyof DoctorRegistrer; keyboardType?: KeyboardTypeOptions }[] = [
    { placeholder: "Nombre", key: "name" },
    { placeholder: "Apellido", key: "lastname" },
    { placeholder: "Edad", key: "age", keyboardType: "numeric" },
    { placeholder: "Especialidad", key: "speciality" },
    { placeholder: "Teléfono", key: "telephone" },
    { placeholder: "Dirección", key: "direction" },
    { placeholder: "Consultorio", key: "consultory" },
  ];

export const initialValues: DoctorRegistrer = {
    
        name: "",
        lastname: "",
        age: 0,
        speciality: "",
        telephone: "",
        direction: "",
        consultory: "",
        user: "",
        pacientes: [],
      
}

export type MedicRegistrerProps = {
    userId: string
  }
  