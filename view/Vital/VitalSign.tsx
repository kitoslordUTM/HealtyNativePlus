import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { useGetMeditionsQuery } from '@/src/services/medition.service';
import Activity from '@/src/molecules/Activity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

const VitalSignsScreen = () => {
  
    const [patientId, setPatientId] = useState("");
   
    const router = useRouter();

    const { data: vitalSignsData, isLoading, refetch } = useGetMeditionsQuery( patientId, {
        skip: !patientId,
      });



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
            {/* Botón de regreso */}
            <TouchableOpacity onPress={() => router.push("/home/patients")} style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {  isLoading ? (
                    <Activity/>
                ) : vitalSignsData && vitalSignsData.length > 0 ? (
                    vitalSignsData.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.title}>{item.meditionName}</Text>
                            <Text style={styles.value}>{item.value}</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 16,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: 10,
        borderRadius: 20,
    },
    backButtonText: {
        fontSize: 24,
        color: '#000',
    },
    card: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },
    value: {
        fontSize: 24,
        color: '#0061fe',
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
