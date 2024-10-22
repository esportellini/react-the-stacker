import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: 'auto',
    padding: 20,
    backgroundColor: '#e9ecef',
    color: '#343a40',
  },
  header: {
    backgroundColor: '#0056b3',
    color: 'white',
    padding: 20,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0056b3',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});