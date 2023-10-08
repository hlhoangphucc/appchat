import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      top:{
        flex:0.5,
        justifyContent:'flex-end',
        alignItems:'center',
        paddingBottom:20
      },
      conten:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
      },
      textInput: {
        width:'90%',
        height: 50,
        borderColor: '#000000',
        borderWidth:1.5,
        fontSize:24,
        fontWeight:'400',
        borderRadius:20,
        paddingLeft:40,
        marginTop:10
      },
      button_login: {
        backgroundColor:'#268FD3',
        borderRadius:20,
        width:'90%',
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:25,
        marginTop:30
      },
      button_register: {
        borderWidth:1.5,
        borderColor:'#3B87DB',
        borderRadius:20,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:25,
        marginTop:10
      },
      text_login:{
        fontSize:24,
        color:'white',
        fontWeight:'bold'
      },
      text_register:{
        fontSize:24,
        color:'#3B87DB',
        fontWeight:'bold'
      },
      phone:{
        width:120,
        height:120,
      },
      texttop:{
        fontSize:30,
        marginBottom:20,
        fontWeight:'bold'
      },
      separator: {
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderWidth:1
      },
  })
  export default styles