import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2023 Minha Empresa. Todos os direitos reservados.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0056b3',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Footer;