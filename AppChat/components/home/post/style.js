import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  bodyContainer: {
    flexDirection: 'row',
  },
  left: {
    width: '15%',
    alignItems: 'center',
  },
  right: {
    width: '80%',
  },
  bodyRight: {
    width: '90%',
  },
  wrap: {
    resizeMode: 'contain',
    width: '80%',
    height: 40,
    borderRadius: 100,
  },
  imgcontent: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  name: {
    color: 'white',
  },
  content: {
    color: 'white',
  },
  bottomRight: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#38444d',
  },
  line: {
    height: 1,
    marginTop: 25,
    backgroundColor: '#38444d',
  },
});

export default styles;
