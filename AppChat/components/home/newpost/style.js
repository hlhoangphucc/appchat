import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  headerContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  headerLeft: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textHeader: {
    color: '#fff',
  },
  buttonHeader: {
    backgroundColor: 'blue',
    width: '35%',
    height: '75%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbuttonHeader: {
    fontSize: 13,
    color: '#fff',
  },
  line: {
    marginTop: 5,
    height: 2,
    backgroundColor: '#38444d',
  },
  bodyContainer: {
    flex: 1,
    paddingTop: 10,
  },
  bodyheader: {
    flexDirection: 'row',
    height: 60,
    paddingLeft: 5,
  },
  bodyheaderLeft: {
    flexDirection: 'row',
    width: 60,
    height: '100%',
    alignItems: 'center',
  },
  bodyheaderRight: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
  },
  wrap: {
    resizeMode: 'center',
    width: '70%',
    height: '70%',
    borderRadius: 100,
  },
  name: {
    color: 'white',
    fontWeight: '800',
    fontSize: 15,
  },
  bodyBody: { flex: 1 },
  bodyStatus: {
    height: '30%',
  },
  uploadImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStatus: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textInput: {
    height: '100%',
    textAlign: 'center',
    color: 'white',
  },
  bottomContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;
