import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StyleSheet from "react-native-media-query";

export default function MyTabBar({ state, descriptors, navigation }) {
  
  // Definimos los íconos de las rutas que queremos mostrar
  const icons = {
    index: (props) => <AntDesign name="home" size={26} {...props} />,
    "patients/index": (props) => <AntDesign name="user" size={26} {...props} />,
    settings: (props) => <AntDesign name="setting" size={26} {...props} />,
  };

  // Orden de las pestañas en la TabBar
  const tabOrder = ["index", "patients/index", "settings"];

  return (
    <View style={styles.tabbar} dataSet={{ media: ids.tabbar }}>
      {tabOrder
        .map((routeName, index) => {
          const route = state.routes.find(r => r.name === routeName);
          if (!route) return null;

          const { options } = descriptors[route.key];
          let label = options.tabBarLabel ?? options.title ?? route.name;

          // Asegurar que "patients/index" aparezca como "Patients"
          if (route.name === "patients/index") label = "Patients";

          const isFocused = state.index === state.routes.findIndex(r => r.name === routeName);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const IconComponent = icons[route.name];

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabbarItem}
            >
              {IconComponent ? (
                <IconComponent color={isFocused ? 'blue' : 'black'} />
              ) : (
                <Text>❓</Text> // Fallback si no hay icono definido
              )}
              <Text style={{ color: isFocused ? 'blue' : 'black' }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const { styles, ids } = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    height:'100%',
    transform: [{ translateX: -150 }],
    width: '20%',
    left:'10%',
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderCurve: 'continuous',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    "@media (max-width: 760px)": {
      position: 'absolute',
      bottom: 25,
      left: '50%',
      height:'10%',
      transform: [{ translateX: -150 }],
      width: 300,
      flexDirection: 'row',
      borderColor:'white',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 25,
      borderCurve: 'continuous',
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
  },
  tabbarItem: {
     width: '100%',
     alignItems: 'center',
     borderBottomWidth: 1,
     padding: 10,

    "@media (max-width: 760px)": {
      flex: 1,
      borderColor:'white',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    }

  },
});
