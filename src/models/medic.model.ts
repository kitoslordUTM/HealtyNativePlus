import { Patient } from "./patient.model";


export type Doctor = {
    name: string;
    lastname: string;
    age: number;
    speciality: string;
    telephone: string;
    direction: string;
    consultory: string;
    user: string; // El ID del usuario
    pacientes?: Patient[]; // El array de pacientes es opcional
  };