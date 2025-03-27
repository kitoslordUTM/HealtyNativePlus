import StyleSheet   from "react-native-media-query";

 const {styles, ids} = StyleSheet.create({
   
  container: { 
    backgroundColor: "white", 
    width: "80%",
    alignSelf:"flex-end",
    padding: 16 ,
    alignContent: "center",
    "@media (max-width: 760px)":{
      flex: 1, 
      padding: 16 ,
      width: "100%",
    }
    
  },
    imageContainer: {
      backgroundColor: '#005A9C',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      marginBottom: 20,
    },
    image: { width: '100%', height: 150 , resizeMode: 'cover', borderRadius: 10, marginBottom: 10, alignSelf: 'center' },
    statsContainer: { marginBottom: 20 , width: '100%'},
    statBox: {
      backgroundColor: '#11275d',
      borderRadius: 12,
      padding: 15,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
    },
   
    smallBox: {
      backgroundColor: '#11275d',
      borderRadius: 12,
      padding: 15,
      width:'50%',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    statLabel: { fontSize: 14, color: 'white', fontWeight: '600' },
    statValue: { fontSize: 20, fontWeight: '600', color: 'white' },
    linksContainer: {   width: '100%', backgroundColor: '#11275d', borderRadius: 12, alignSelf: 'center', alignItems: 'center', 
        padding: 10, marginBottom: 20 , height: 80
     },
    link: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      paddingVertical: 10,
      display: 'flex',
      width: '100%',
      gap: 5,
      height: 60,
    },
    linkText: { fontSize: 16, color: 'white', fontWeight: '600', marginLeft:70 },
    

    TittleCenter: {
         // Centra los hijos verticalmente
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center', // Centra los hijos horizontalmente
        justifyContent: 'center',
    }

  });
  
export {styles, ids}