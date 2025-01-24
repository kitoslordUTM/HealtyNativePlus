import { FlatList, Text, View } from "react-native";
import { useGetPatientsQuery } from "../src/services/patient.service";
import { Patient } from "../src/models/patient.model";
import PatientListScreen from "../view/item.view";
 

export default function HomeScreen() {
  const { data, error, isLoading } = useGetPatientsQuery();

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error al cargar los datos.</Text>;
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item: Patient) => item.patientid.toString()}
        renderItem={({ item }) => <PatientListScreen patient={item} />}
      />
    </View>
  );
}
