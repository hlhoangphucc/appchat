import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      top:{
        flex:0.5,
        justifyContent:'flex-end',
        alignItems:'center',
      },
      conten:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
      },
      textInput: {
        width:'100%',
        height:50,
        borderColor: '#000000',
        borderWidth:1.5,
        fontSize:24,
        fontWeight:'400',
        borderRadius:20,
        paddingHorizontal:45,
        marginTop:25
      },
      conten_email:{
        width:'90%',
      },
      conten_pass:{
        width:'90%',
        flexDirection:'row',
        alignItems:'flex-end'
      },
      visible:{
        width:40,
        height:40,
        marginRight:10,
        marginBottom:5
      },
      button_login: {
        backgroundColor:'#268FD3',
        borderRadius:20,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:25,
        width:'90%',
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
        marginTop:10,
        width:'90%'
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