import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', padding: 20 },
    imageContainer: {
      backgroundColor: '#005A9C',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      marginBottom: 20,
    },
    image: { width: '100%', height: 150 , resizeMode: 'cover', borderRadius: 10, marginBottom: 10 },
    statsContainer: { marginBottom: 20 },
    statBox: {
      backgroundColor: '#F3F4F6',
      borderRadius: 12,
      padding: 15,
      alignItems: 'center',
      marginBottom: 10,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    smallBox: {
      backgroundColor: '#F3F4F6',
      borderRadius: 12,
      padding: 15,
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    statLabel: { fontSize: 14, color: '#555' },
    statValue: { fontSize: 20, fontWeight: '600' },
    linksContainer: { marginTop: 10 },
    link: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    linkText: { fontSize: 16, color: '#000' },
    arrow: { fontSize: 16, color: '#000' },

    TittleCenter: {
         // Centra los hijos verticalmente
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center', // Centra los hijos horizontalmente
        justifyContent: 'center',
    }

  });
  
