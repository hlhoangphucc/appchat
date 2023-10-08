import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
    paddingTop: 10,
  },
  headerContainer: {
    height: 35,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyContainer: {
    height: '40%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  contentBody: {
    height: '20%',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  textHeader: {
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  lineBody: {
    height: 1,
    backgroundColor: '#38444d',
  },
  textContent: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btnsignout: {
    height: 70,
    width: '90%',
    backgroundColor: '#ED1B24',
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtbtn: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
});

export default styles;
