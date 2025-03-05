import * as Index from "./index";
import { TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyleSheet from "react-native-media-query";
import Toast from "react-native-toast-message";
import { TextInput } from "react-native";


const {
  useState,
  ActivityIndicator,
  View,
  useSignInMutation,
  useRouter,
  Text,
} = Index;

export default function Login() {
  const router = useRouter();
  const [signIn, { isLoading }] = useSignInMutation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const response = await signIn(credentials).unwrap();
      const userId = response.user.id;
      // Guardar userId en AsyncStorage
      await AsyncStorage.setItem("userId", userId || "");
      Toast.show({
        type: "success",
        text1: "Exito",
        text2: "Exito al iniciar sesión con  tu correo electrónico 👋",
      });
      router.push("/home");
    } catch (err) {
      console.error("Error de autenticación", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error al iniciar sesión con tu correo electrónico 👋",
      });
    }
  };

  return (
    <View
      style={styles.patherContainer}
      dataSet={{ media: ids.patherContainer }}
    >
      {/* Sección superior con fondo azul oscuro */}
      <View style={styles.firstChild} dataSet={{ media: ids.firstChild }}>
        <View
          style={styles.logoContainer}
          dataSet={{ media: ids.logoContainer }}
        >
          <Text
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: "white",
              alignSelf: "center",
              paddingTop: 40
            }}
            dataSet={{ bigLetter: ids.bigLetter }}
          >
            H+
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              alignSelf: "center",
              padding: 10,
            }}
          >
            HEALTHY +
          </Text>
        </View>

        {/* Sección del formulario */}
        <View style={styles.card} dataSet={{ media: ids.card }}>
          <View dataSet={{ media: ids.header }}>
            <Text
              style={{
                marginLeft: 50,
                marginTop: 7,
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20,
                color: "black",
              }}
            >
              Hola, Doctor
            </Text>
          </View>

          <View style={{ height: 'auto'}}>
            <TextInput
            style={{
              borderRadius: 40,
              marginBottom: 16, // assuming 1rem is approximately 16px
              alignSelf: "center",
              width: "80%",
              borderWidth: 2, 
              borderColor: '#0A2240',
              padding: 15
              
            }}
            placeholder="Correo electrónico"
                value={credentials.email}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, email: text })
                }
            />


          <TextInput
            style={{
              borderRadius: 40,
              marginBottom: 16, // assuming 1rem is approximately 16px
              alignSelf: "center",
              width: "80%",
              borderWidth: 2, 
              borderColor: '#0A2240',
              padding: 15
              
            }}
            placeholder="Contraseña"
            value={credentials.password}
            onChangeText={(text) =>
              setCredentials({ ...credentials, password: text })
            }
            />

          <View  style={{
              borderRadius: 30,
              alignSelf: "center",
              width: "80%",
              backgroundColor: "white",
              borderColor: "#0A2240",
              borderWidth: 2,
            }}        >
          <TouchableOpacity
            style={{padding: 12}}
            onPress={handleLogin}
            
          >
            {isLoading ? (
              <ActivityIndicator color="#0A2240" />
            ) : (
              <Text style={{  color: "#0A2240", fontWeight: "bold", alignSelf: 'center'  }}>
                Iniciar Sesión
              </Text>
            )}
          </TouchableOpacity>
          </View>



          <View>
            <View></View>
            <Text bold={true} style={{ alignSelf: "center", color: "black" }}>
              {" "}
              ó
            </Text>
            <View></View>
          </View>

          <TouchableOpacity
              style={{
                borderRadius: 30,
                alignSelf: "center",
                width: "80%",
                backgroundColor: "white",
                borderColor: "#0A2240",
                marginBottom: 20,
                display: 'flex',
                flexDirection: 'row',
                padding: 10,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',  // Asegúrate de usar 'center' en justifyContent para centrar los elementos
                gap: 16,
              }}
              
            >
            {/* source={require("@/assets/googleLogo.png")} style={styles.image} */}
            <Image />
            <Text 
              style={{ 
                color: "#0A2240", 
                fontWeight: "bold", 
                alignSelf: 'center', 
                marginLeft: 20 
              }}
            >
              Iniciar sesión con Google
            </Text>
            <Image 
                source={require("@/assets/googleLogo.png")} 
                style={{ width: 30, height: 30, backgroundColor: "white", alignSelf: 'center' }} 
              />
          </TouchableOpacity>

          <View className="flex-row justify-center gap-1">
            <Text bold={true} style={{ color: "black" }}>
              ¿No tienes una cuenta?
            </Text>
            <TouchableOpacity onPress={() => router.push("/auth")}>
              <Text
                bold={true}
                style={{ color: "#0A2240", fontWeight: "bold" }}
              >
                Regístrate
              </Text>
            </TouchableOpacity>
          </View>

          </View>
 
        </View>
      </View>
      <View style={styles.secondChild} dataSet={{ media: ids.secondChild }}>
        {/*componente de imagen*/}
        <Image source={require("@/assets/imagenDoc.png")} />
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  //creación de clases
  card: {
    width: "100%", // 📌 Se adapta mejor a celulares pequeños
    height: "70%",
    paddingTop: 60,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    "@media (max-width: 2000px)": {
      height: "70%",
      display: "flex",
      flexDirection: "column",
      gap: "0.7rem",
      backgroundColor: "white",
      paddingTop: 10,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
    },
    "@media (max-width: 480px)": {
      width: "100%", // 📌 Se adapta mejor a celulares pequeños
      height: "70%",
      paddingTop: 60,
    },
  },

  input: {
    borderRadius: 40,
    marginBottom: 16, // assuming 1rem is approximately 16px
    alignSelf: "center",
    width: "80%",

    "@media (max-width: 2000px)": {
      borderRadius: "2rem",
      marginBottom: 16, // assuming 1rem is approximately 16px
      alignSelf: "center",
      width: "80%",
    },
  },

  button: {
    borderRadius: 30,
    alignSelf: "center",
    width: "80%",
    backgroundColor: "white",
    borderColor: "#0A2240",
    borderWidth: 1,

    "@media (max-width: 2000px)": {
      borderRadius: "2rem",
      alignSelf: "center",
      width: "80%",
      backgroundColor: "white",
      borderColor: "#0A2240",
      borderWidth: 1,
    },
  },

  logoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "30%",
    gap: "2rem",
    backgroundColor: "#0A2240",
    "@media (max-width: 2000px)": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "30%",
      gap: "2rem",
      backgroundColor: "#0A2240",
    },
  },

  bigLetter: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",

    "@media (max-width: 2000px)": {
      fontSize: 48,
      fontWeight: "bold",
      color: "#0A2240",
    },
  },

  subtittle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",

    "@media (max-width: 2000px)": {
      fontSize: 24,
      fontWeight: "bold",
      color: "#0A2240",
    },
  },
  patherContainer: {
    flex: 1, // Hace que el contenedor ocupe toda la pantalla
    flexDirection: "row", // Distribuye los hijos en fila
    width: "100%",
    "@media (max-width: 2000px)": {
      flexDirection: "row",
    },
  },

  firstChild: {
    width: "100%",
    backgroundColor: "#0A2240",
    "@media (max-width: 2000px)": {
      flex: 4, // Se mantiene el mismo porcentaje en media query
    },
  },

  secondChild: {
    flex: 0,
    width: "0%",
    "@media (max-width: 2000px)": {
      flex: 6,
    },
    "@media (max-width: 480px)": {
      flex: 0,
    },
  },

  header: {
    marginLeft: 50,
    marginTop: 7,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    "@media (max-width: 480px)": {
      marginBottom: 20,
    },
  },
});
