import * as Index from './index';
import { styles } from './style';
import { PatientListProps } from './index';
const { 
  React, 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Ionicons, 
  useRouter, 
 
} = Index;



export default function PatientList({data}:PatientListProps ) {

  const router = useRouter();

  return (
    <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.patientItem} onPress={() => router.push(`/patient/${item._id}`)}>
            <Image style={styles.avatar} />
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{item.name} {item.lastname}</Text>
              <Text style={styles.patientDetails}>Age {item.age}, {item.gender}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      />
  )
}


