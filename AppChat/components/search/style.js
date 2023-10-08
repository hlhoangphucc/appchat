import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#15202b',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 24,
    height: 50,
    marginLeft: 5,
    color: 'white',
  },
  icon: {
    color: '#b1b5b9',
    marginRight: 10,
    fontSize: 25,
  },
  itemuser: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 90,
    width: '95%',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  left: {
    flex: 0.4,
    justifyContent: 'center',
  },
  center: {
    flex: 1.2,
    justifyContent: 'center',
  },
  right: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avtuser: {
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 50,
    borderWidth: 1,
  },
  username: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  iconchat: {
    width: 40,
    height: 40,
  },
  bottom: {
    height: 90,
    width: '100%',
    marginTop: 15,
  },
});

export default styles;
