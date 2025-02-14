import React from "react";
import { 
    View, 
    Text, 
    TextInput, 
    FlatList, 
    Image, 
    TouchableOpacity 
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Para iconos
import { useGetPatientsQuery } from "@/src/services/patient.service";

import PatientList from "./PatientList";

import { PatientListProps } from "./const";

export {
    React,
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    Ionicons,
    useGetPatientsQuery,
   
    PatientList,
 
    PatientListProps
};
