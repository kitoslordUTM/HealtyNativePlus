import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#F8FAFC",
      padding: 16,
    },
     

    title: {
      fontSize: 20,
        fontWeight: '800',
        color: '#000',
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center', // Centra los hijos horizontalmente
        justifyContent: 'center',
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
      bottom: 30,
      right: 15,
      backgroundColor: "#11275d",
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
      marginBottom:90
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

      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      modalContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 500,
  
      },
      patientImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 15,
        resizeMode: 'cover',
        alignSelf: 'center',
      },
      patientName: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
      patientDetails: {
        marginBottom: 15,
      },
      subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
      },
      contactButtons: {
        marginTop: 20,
        justifyContent: 'center',
      },
      smsButton: {
        backgroundColor: '#007bff',
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
      
      },
      smsButtonText: {
        color: 'white',
        textAlign: 'center',
        width:'90%'
      },
      smsUnavailableText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
      },
      modalFooter: {
        padding: 20,
      },
      footerButton: {
        backgroundColor: '#11275d',
        padding: 10,
        borderRadius: 5,
      },
      footerButtonText: {
        color: 'white',
        textAlign: 'center',
      },
      closeButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      },
      closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight:'800'
      },

  });
  