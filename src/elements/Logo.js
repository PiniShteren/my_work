import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = ({ small }) => (
  <Image source={require(small ? "../assets/fevorite.svg" : '../assets/logo.svg')} style={styles.image(small)} />
);

const styles = StyleSheet.create({
  image: (small) => ({
    width: small ? "4vw" : 200,
    height: small ? "4vw" : 200,
    marginBottom: small ? 0 : 12,
    alignSelf: "center",
    filter: "drop-shadow(2px 4px 6px black)",
  }),
});

export default memo(Logo);