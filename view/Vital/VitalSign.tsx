import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { useGetMeditionsQuery } from '@/src/services/medition.service';
import Activity from '@/src/molecules/Activity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { AdvancedFilterBar } from '@/components/AdvanceFilterBar';
import DateFilter from '@/components/filters/DateFilter';

const VitalSignsScreen = () => {
  
    const [patientId, setPatientId] = useState("");
   
    const router = useRouter();

    const [startDate, setStartDate]= useState('')

    const {
      data: vitalSignsData,
      isLoading,
      refetch,
    } = useGetMeditionsQuery({userId: patientId, startDate:startDate }, {
      skip: !patientId,
    });
  
    const handleSubmit = (formattedDate: string) => {
      setStartDate(formattedDate);
      refetch();
      console.log(formattedDate, 'formattedDate');
    }

    useFocusEffect(
        useCallback(() => {
          let isActive = true; // Usualmente se usa para prevenir fugas de memoria si lo deseas
    
          (async () => {
            try {
              const storedPatientId = await AsyncStorage.getItem("selectedPatientId");
              if (isActive) {
                setPatientId(storedPatientId || "");
                console.log("Patient ID:", storedPatientId);
                
              }
            } catch (error) {
              console.error("Error reading AsyncStorage:", error);
            }
          })();
    
          // Opcional: si deseas limpiar algo cuando la pantalla pierda el foco
          return () => {
            isActive = false;
          };
        }, []) // Ajusta las dependencias según necesites
      );

      useFocusEffect(
        useCallback(() => {
          if (patientId ) {
            refetch();
            console.log(patientId);
          }
        }, [patientId, refetch])
      );
    
    return (
     <SafeAreaView style={styles.container}>
             {/* aqui ira el filtro fecha */}
            
      <AdvancedFilterBar 
              Filter={
                <>
                  <DateFilter
                    handleSubmit={handleSubmit}
                    status={setStartDate} // Ahora pasamos setStartDate
                    startDate={startDate} // Pasamos startDate como prop
                    refetch={refetch}
                  />
                   
                </>
              }
            />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {  isLoading ? (
                    <Activity/>
                ) : vitalSignsData && vitalSignsData.length > 0 ? (
                    vitalSignsData.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.title}>{item.meditionName}</Text>
                            <Text style={styles.value}>{item.value}</Text>
                            <Text style={styles.value}>{item.createdAt}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>Sin mediciones</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default VitalSignsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        paddingTop: 73,
        paddingHorizontal: 16,
        flexGrow: 1,
    },

    card: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        backgroundColor: '#11275d',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    value: {
        fontSize: 24,
        color: 'white',
    },
    noDataText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#808080',
        textAlign: 'center',
        marginTop: 20,
    },
    loader: {
        marginTop: 20,
    },
});
