import { Text } from "react-native";
import { Patient } from "../src/models/patient.model";

type PatientListScreenProps = {
    patient: Patient;
}


export default function PatientListScreen({patient}: PatientListScreenProps) {
  return <Text>{patient.name}</Text>;
}