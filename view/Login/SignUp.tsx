import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Íconos para inputs
import styles from "./style";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hola, Bienvenido</Text>
        <Text style={styles.subtitle}>Registrate para continuar...</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => handleChange("name", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(text) => handleChange("password", text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push("./MedicRegister")}>
          <Text style={styles.buttonText}>REGISTRAR CUENTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
