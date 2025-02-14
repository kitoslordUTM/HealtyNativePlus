import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#F8FAFC",
      padding: 16,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 27,
      marginBottom:10
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#E5E7EB",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
    },
  
     addButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: "#007AFF",
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
    patientItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
      },
      patientInfo: {
        flex: 1,
      },
      patientName: {
        fontSize: 16,
        fontWeight: "bold",
      },
      
      patientDetails: {
        fontSize: 14,
        color: "#666",
      },

  });
  