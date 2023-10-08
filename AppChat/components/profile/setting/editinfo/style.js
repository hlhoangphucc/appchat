import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  bodyContainer: {
    height: 200,
    backgroundColor: '#272c38',
  },
  bodyTop: {
    height: '70%',
    flexDirection: 'row',
  },
  bodyLeft: {
    width: '30%',
  },
  bodyRight: {
    width: '70%',
    top: 20,
    justifyContent: 'center',
  },
  avtUser: {
    top: 10,
    height: '100%',
    alignItems: 'center',
  },
  avt: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  wrapAvt: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  bodyBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBottom: {
    width: '80%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007FFF',
  },
  textInput: {
    height: '100%',
    color: 'white',
  },
  textInputBody: {
    height: '30%',
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
  },
  radioContainer: {
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {
    width: '30%',
    height: '60%',
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    marginVertical: 5,
    justifyContent: 'center',
    borderColor: 'black',
  },
  radioButtonSelected: {
    backgroundColor: '#007FFF',
  },
  textOption: {
    color: 'white',
  },
  saveText: { color: 'white', fontSize: 20 },
  iconsBackContainer: {
    top: 5,
    left: 10,
  },
});

export default styles;
