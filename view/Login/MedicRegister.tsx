import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Íconos para inputs
import styles from "./style";
import { useRouter } from "expo-router";

const MedicRegister = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        surname: "",
        specialty: "",
        phone: "",
        address: "",
        clinic: "",
    });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hola, Doctor</Text>
        <Text style={styles.subtitle}>Crea tu cuenta para continuar...</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Nombre(s)"
            onChangeText={(text) => handleChange("name", text)}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            onChangeText={(text) => handleChange("surname", text)}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <FontAwesome name="star" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Especialidad"
            onChangeText={(text) => handleChange("specialty", text)}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange("phone", text)}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <FontAwesome name="home" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            onChangeText={(text) => handleChange("address", text)}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <FontAwesome name="hospital-o" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Consultorio"
            onChangeText={(text) => handleChange("clinic", text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push("")}>
          <Text style={styles.buttonText}>CREAR CUENTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicRegister;
