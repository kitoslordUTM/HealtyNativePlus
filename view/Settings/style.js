import { StyleSheet } from "react-native";


 export const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: '#EFEFF4',
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 30,
    },
    headerTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 20,
    },
    profile: {
      alignItems: 'center',
      marginBottom: 40,
    },
    profileImage: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 3,
      borderColor: 'white',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 25,
      //borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingBottom: 15,
    },
    iconContainer: {
      marginRight: 15,
    },
    icon: {
      width: 20,
      height: 20,
      marginHorizontal: 8, 
    },
    iconcerrar: {
      width: 40,
      height: 40,
    },
    label: {
      fontWeight: 'bold',
      width: 200,
      fontSize: 16,
      color: '#333',
    },
    value: {
      flex: 1,
      fontSize: 14,
      color: '#666',
    },
    deleteButton: {
      backgroundColor: 'transparent', // Fondo transparente
      padding: 18,
      borderRadius: 20,
      marginTop: 60,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#8F8F8F',
    },
    deleteButtonText: {
      color: '#F0506E', 
      fontSize: 14,
      fontWeight:'bold'
    },
    editIconContainer: { 
      position: 'absolute', 
      bottom: 8, 
      right: 108,  
      backgroundColor: '#8F8F8F', 
      borderRadius: 20,
      padding: 8,     
      elevation: 5, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    editIcon: { 
      width: 20,
      height: 20,
      tintColor: 'white' 
    },
  });