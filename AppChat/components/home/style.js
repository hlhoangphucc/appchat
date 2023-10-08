import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  line: {
    height: 2,
    backgroundColor: '#38444d',
  },
  lineBody: {
    height: 3,
    backgroundColor: 'black',
  },

  headerContainer: {
    paddingLeft: 15,
    paddingRight: 5,
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    width: '85%',
    justifyContent: 'center',
  },
  headerRight: {
    width: '15%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  wrap: {
    resizeMode: 'contain',
    width: '50%',
    height: '50%',
  },
  wrapBody: {
    resizeMode: 'contain',
    width: '100%',
    height: '80%',
    borderRadius: 100,
  },
  bodyContainer: {
    height: '80%',
  },
  bottomContainer: {
    height: '10%',
  },
  headerBody: {
    paddingHorizontal: 10,
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerleftBody: {
    paddingLeft: 10,
    width: '15%',
  },
  headercenterBody: {
    width: '65%',
  },

  boderradiusBody: {
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 10,
    height: 40,
    justifyContent: 'center',
    borderColor: 'white',
  },
  textheaderBody: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  statusheaderBody: { color: 'white' },
  bottomContainer: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#15202b',
  },
  contentBody: { height: '90%' },
  bowshadow: {
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15202b',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  boderText: {
    color: 'white',
  },
});
export default styles;
